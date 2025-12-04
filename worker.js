// Declare userID and proxyIP at the top for easy editing
let userID = 'your-uuid-here'; // Replace with your actual UUID
let proxyIP = 'your-proxy-ip-here'; // Replace with your actual proxy server IP

import { connect } from 'cloudflare:sockets';

// Cyberpunk-themed UI function
function getItsbadUI(domain, uuid) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ITSBAD PRO</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            background: linear-gradient(135deg, #000000, #1a1a1a, #000000);
            background-size: 400% 400%;
            animation: gradient 15s ease infinite;
            color: #00ff00;
            font-family: 'Courier New', monospace;
        }
        @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        .neon {
            text-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00, 0 0 15px #00ff00, 0 0 20px #00ff00;
        }
        .cyberpunk {
            border: 1px solid #00ff00;
            box-shadow: 0 0 10px #00ff00;
        }
    </style>
</head>
<body class="min-h-screen flex items-center justify-center">
    <div class="text-center">
        <h1 class="text-6xl font-bold neon mb-8">ITSBAD PRO</h1>
        <div class="cyberpunk p-6 rounded-lg mb-6">
            <p class="text-xl mb-4">SYSTEM ONLINE</p>
            <p class="text-lg mb-4">UUID: <code class="bg-gray-800 p-2 rounded">${uuid}</code></p>
            <button class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4" onclick="copyUUID('${uuid}')">Copy UUID</button>
        </div>
        <div class="cyberpunk p-6 rounded-lg">
            <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4" onclick="getVLESS()">Get VLESS Config</button>
            <button class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded" onclick="getClash()">Clash Config</button>
        </div>
    </div>
    <script>
        function copyUUID(uuid) {
            navigator.clipboard.writeText(uuid);
            alert('UUID copied!');
        }
        function getVLESS() {
            const config = 'vless://' + '${uuid}' + '@${domain}:443?type=ws&security=tls&sni=${domain}&path=/&host=${domain}#ITSBAD-PRO';
            navigator.clipboard.writeText(config);
            alert('VLESS Config copied!');
        }
        function getClash() {
            const config = \`proxies:
- name: ITSBAD PRO
  type: vless
  server: ${domain}
  port: 443
  uuid: ${uuid}
  tls: true
  servername: ${domain}
  network: ws
  ws-opts:
    path: /
    headers:
      Host: ${domain}\`;
            navigator.clipboard.writeText(config);
            alert('Clash Config copied!');
        }
    </script>
</body>
</html>
  `;
}

// Function to generate VLESS config
function generateVLESSConfig(domain, uuid) {
  return `vless://${uuid}@${domain}:443?type=ws&security=tls&sni=${domain}&path=/&host=${domain}#ITSBAD-PRO`;
}

// Function to generate Clash config
function generateClashConfig(domain, uuid) {
  return `proxies:
- name: ITSBAD PRO
  type: vless
  server: ${domain}
  port: 443
  uuid: ${uuid}
  tls: true
  servername: ${domain}
  network: ws
  ws-opts:
    path: /
    headers:
      Host: ${domain}`;
}

// Handle WebSocket for tunneling (simplified from Nautica logic)
async function handleWebSocket(request) {
  const upgradeHeader = request.headers.get('Upgrade');
  if (upgradeHeader !== 'websocket') {
    return new Response('Expected Upgrade: websocket', { status: 426 });
  }

  const webSocketPair = new WebSocketPair();
  const [client, server] = Object.values(webSocketPair);

  server.accept();

  // Connect to proxy server
  const remoteSocket = await connect({
    hostname: proxyIP,
    port: 443,
  });

  // Handle data transfer
  server.addEventListener('message', async (event) => {
    const data = event.data;
    await remoteSocket.write(data);
  });

  remoteSocket.readable.pipeTo(new WritableStream({
    write(chunk) {
      server.send(chunk);
    }
  }));

  return new Response(null, {
    status: 101,
    webSocket: client,
  });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const domain = url.hostname;

    // If root path, return UI
    if (url.pathname === '/' || url.pathname === '') {
      return new Response(getItsbadUI(domain, userID), {
        headers: { 'Content-Type': 'text/html' },
      });
    }

    // If /sub, return config
    if (url.pathname === '/sub') {
      const config = generateVLESSConfig(domain, userID);
      return new Response(config, {
        headers: { 'Content-Type': 'text/plain' },
      });
    }

    // If WebSocket, handle tunneling
    if (request.headers.get('Upgrade') === 'websocket') {
      return handleWebSocket(request);
    }

    // Default response
    return new Response('ITSBAD PRO - Tunneling Service', {
      headers: { 'Content-Type': 'text/plain' },
    });
  },
};