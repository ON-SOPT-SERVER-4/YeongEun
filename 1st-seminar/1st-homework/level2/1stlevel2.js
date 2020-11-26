const members = require('./serverMembers')

const ourMember = function(a){
    var member = []
    for(var i = 0; i < a.length; i++){
        member.push(a[i])
    }
    return member
}

console.log(ourMember(members))