"use strict";
var rateLimit = require('express-rate-limit');
var authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    skipSuccessfulRequests: true,
});
module.exports = {
    authLimiter: authLimiter,
};
//# sourceMappingURL=rateLimiter.js.map