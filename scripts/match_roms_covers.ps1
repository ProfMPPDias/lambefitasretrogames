$romsDir = "C:\Users\mppdi\Downloads\videogames_retro\roms\md"
$coversDir = "C:\Users\mppdi\Downloads\videogames_retro\covers\md"
$romsSemCapa = "C:\Users\mppdi\Downloads\videogames_retro\roms\roms_sem_capa"
$capasSemRom = "C:\Users\mppdi\Downloads\videogames_retro\covers\capas_sem_roms"

New-Item -ItemType Directory -Force -Path $romsSemCapa | Out-Null
New-Item -ItemType Directory -Force -Path $capasSemRom | Out-Null

$roms = Get-ChildItem -Path $romsDir -File | Where-Object { $_.Extension -in '.md','.bin','.smd','.gen' }
$covers = Get-ChildItem -Path $coversDir -File | Where-Object { $_.Extension -in '.png','.jpg','.jpeg','.gif','.webp' }

Write-Host "ROMs: $($roms.Count), Capas: $($covers.Count)"

$coverMap = @{}
foreach ($cover in $covers) {
    $baseName = $cover.BaseName.ToLower().Trim()
    $coverMap[$baseName] = $cover
    $cleanKey = $baseName -replace '[^a-z0-9]', ''
    if (-not $coverMap.ContainsKey($cleanKey)) { $coverMap[$cleanKey] = $cover }
    $normKey = $baseName -replace '[^\w\s]', '' -replace '\s+', ' '.Trim()
    if (-not $coverMap.ContainsKey($normKey)) { $coverMap[$normKey] = $cover }
}

$matched = @()
$matchedCoverBases = @{}

foreach ($rom in $roms) {
    $romBase = $rom.BaseName.ToLower().Trim()
    $romClean = $romBase -replace '[^a-z0-9]', ''
    $romNorm = $romBase -replace '[^\w\s]', '' -replace '\s+', ' '.Trim()

    $foundCover = $null

    if ($coverMap.ContainsKey($romBase)) {
        $foundCover = $coverMap[$romBase]
    } elseif ($coverMap.ContainsKey($romClean)) {
        $foundCover = $coverMap[$romClean]
    } elseif ($coverMap.ContainsKey($romNorm)) {
        $foundCover = $coverMap[$romNorm]
    } else {
        foreach ($key in $coverMap.Keys) {
            if ($key -eq $romBase -or $key -eq $romClean -or $key -eq $romNorm) {
                $foundCover = $coverMap[$key]
                break
            }
        }
    }

    if ($foundCover) {
        $matched += [PSCustomObject]@{
            romFile = $rom.Name
            coverFile = $foundCover.Name
            id = ($rom.BaseName -replace '[^a-zA-Z0-9]', '_').TrimEnd('_') -replace '_+', '_'
        }
        $matchedCoverBases[$foundCover.BaseName.ToLower().Trim()] = $true
    } else {
        Move-Item -Path $rom.FullName -Destination (Join-Path $romsSemCapa $rom.Name) -Force
        Write-Host "ROM sem capa: $($rom.Name)"
    }
}

foreach ($cover in $covers) {
    $key = $cover.BaseName.ToLower().Trim()
    $cleanKey = $key -replace '[^a-z0-9]', ''
    $found = $matchedCoverBases.ContainsKey($key) -or $matchedCoverBases.ContainsKey($cleanKey)
    if (-not $found) {
        foreach ($m in $matched) {
            $mCoverBase = ($m.coverFile -replace '\.[^.]+$','').ToLower().Trim()
            if ($mCoverBase -eq $key) { $found = $true; break }
        }
    }
    if (-not $found) {
        Move-Item -Path $cover.FullName -Destination (Join-Path $capasSemRom $cover.Name) -Force
        Write-Host "Capa sem ROM: $($cover.Name)"
    }
}

Write-Host "`nTotal jogos com ROM + Capa: $($matched.Count)"
Write-Host "ROMs sem capa em: $romsSemCapa"
Write-Host "Capas sem ROM em: $capasSemRom"
