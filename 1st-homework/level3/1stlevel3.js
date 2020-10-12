const member = require('./member')

const OB = []
const YB = []

for (var i = 0; i < member.length; i++){
    if (member[i].status === "OB"){
        OB.push(member[i].name)
    }
    else{
        YB.push(member[i].name)
    }
}

OB.sort(function(){
    return Math.random() - Math.random();
})
YB.sort(function(){
    return Math.random() - Math.random();
})


const rd_mem = []
var j = 0
for (var i = 0; i < OB.length;){
    if (i < 6){
        rd_mem.push(OB.slice(i,i+2).concat(YB.slice(j,j+4)))
        i = i + 2
        j = j + 4
    }
    else{
        rd_mem.push(OB.slice(i,i+3).concat(YB.slice(j,j+3)))
        i = i + 3
        j = j + 3
    }
}

console.log(rd_mem)