exports.redis = {
   'port': process.env.OPENSHIFT_REDIS_PORT,
   'auth': process.env.REDIS_PASSWORD,
   'host': process.env.OPENSHIFT_REDIS_HOST
}
