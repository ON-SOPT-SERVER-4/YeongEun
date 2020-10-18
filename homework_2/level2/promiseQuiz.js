const members = require('./member');

function getFemale(members){
    return new Promise(function (resolve, reject){
        setTimeout(function(){
            const data = members.filter(item => item.gender === '여')
            resolve(data);
        } ,1000)
    })
}

function getYB(members){
    return new Promise(function (resolve, reject){
        setTimeout(function(){
            const data = members.filter(item => item.status === 'YB')
            resolve(data);
        }, 1000)
    })
}

function getiOS(members){
    return new Promise(function (resolve, reject){
        setTimeout(function(){
            const data = members.filter(item => item.part === 'iOS')
            resolve(data);
        }, 1000)
    })
}

getFemale(members)
    .then(members => getYB(members))
    .then(members => getiOS(members))
    .then(members => console.log(members));