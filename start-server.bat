@echo off
setlocal
cd /d "%~dp0"

echo Starting static server at http://localhost:8000
echo Serving folder: %cd%
echo Press Ctrl+C in this window to stop.
echo.

powershell -NoProfile -ExecutionPolicy Bypass -Command "$listener = [System.Net.HttpListener]::new(); $listener.Prefixes.Add('http://localhost:8000/'); $listener.Start(); Start-Process 'http://localhost:8000'; Write-Host 'Server running on http://localhost:8000'; while ($listener.IsListening) { $ctx = $listener.GetContext(); $rawPath = [uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath.TrimStart('/')); if ([string]::IsNullOrWhiteSpace($rawPath)) { $rawPath = 'index.html' }; $file = Join-Path (Get-Location) $rawPath; if ((Test-Path $file) -and -not (Get-Item $file).PSIsContainer) { $bytes = [System.IO.File]::ReadAllBytes($file); $ext = [System.IO.Path]::GetExtension($file).ToLowerInvariant(); $type = switch ($ext) { '.html' {'text/html; charset=utf-8'} '.js' {'text/javascript; charset=utf-8'} '.css' {'text/css; charset=utf-8'} '.json' {'application/json; charset=utf-8'} '.png' {'image/png'} '.jpg' {'image/jpeg'} '.jpeg' {'image/jpeg'} '.svg' {'image/svg+xml'} default {'application/octet-stream'} }; $ctx.Response.ContentType = $type; $ctx.Response.ContentLength64 = $bytes.Length; $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length) } else { $ctx.Response.StatusCode = 404; $msg = [System.Text.Encoding]::UTF8.GetBytes('404 Not Found'); $ctx.Response.OutputStream.Write($msg, 0, $msg.Length) }; $ctx.Response.OutputStream.Close() }"