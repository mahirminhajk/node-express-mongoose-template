import expressCache from 'cache-express'

export default function createCacheMiddleware(dependsOnArray = [], cacheTime = 60 * 60 * 1000, onTimeOut = (key, value) => {
    console.log(`Cache removed for key: ${key} 🟡`.orange);
}) {
    return expressCache({
        dependsOn: () => dependsOnArray,
        cacheTime: cacheTime, //* this is in milliseconds
        onTimeOut: onTimeOut
    });
};


//* milliseconds
//* 60 * 1000 = 1 minute
//* 5 * 60 * 1000 = 5 minutes
//* 60 * 60 * 1000 = 1 hour
//* 2 * 60 * 60 * 1000 = 2 hours
//* 60 * 60 * 24 * 1000 = 1 day
//* 60 * 60 * 24 * 7 * 1000 = 1 week