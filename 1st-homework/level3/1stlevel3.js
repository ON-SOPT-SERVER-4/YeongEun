const member = require('./member');

const OB = member.filter(person => person.status === "OB"); //OB
const YB = member.filter(person => person.status === "YB"); //YB

OB.sort(function(){
    return Math.random() - Math.random(); //OB 랜덤 정렬
})
YB.sort(function(){
    return Math.random() - Math.random(); //YB 랜덤 정렬
})

const makeTeam = function(teamCnt){ //teamCnt : 팀 개수
    const OBNum = Math.floor(OB.length / teamCnt);
    const YBNum = Math.floor(YB.length / teamCnt);
    
    teamOB = [];
    while(teamOB.length < teamCnt){
        teamOB.push(OB.splice(0, OBNum));
    }
    for (var i = 0; i < OB.length; i++){
        teamOB[i].push(OB[i])
    }
    
    teamYB = [];
    while(teamYB.length < teamCnt){
        teamYB.push(YB.splice(0, YBNum));
    }
    for (var i = 0; i < YB.length; i++){
        teamYB[i].push(YB[i])
    }
    teamYB_rev = teamYB.reverse();

    const finalTeam = []
    for (var i = 0; i < teamCnt ; i++){
        finalTeam.push(teamOB[i].concat(teamYB_rev[i]));
    }
    return finalTeam
}

console.log(makeTeam(6));
