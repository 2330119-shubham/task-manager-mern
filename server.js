import dns from 'node:dns';           // 1. ADD THIS LINE
dns.setServers(['8.8.8.8', '8.8.4.4']); // 2. ADD THIS LINE (Google DNS)

import express from 'express';
import dotenv from 'dotenv';
// ... (rest of your imports)