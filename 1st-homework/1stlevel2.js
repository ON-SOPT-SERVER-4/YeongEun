const serverMembers = [
    {
        name : "이영은",
        location : "건대입구",
        age : 24,
        hobby : "운동"
    },
    {
        name : "정효원",
        location : "성신여대입구",
        age : 24,
        hobby : "친구만나기"
    },
    {
        name : "류세화",
        location : "교대역",
        age : 23,
        hobby : "유튜브보기"
    },
    {
        name : "김우영",
        location : "서울대입구",
        age : 24,
        hobby : "피아노치기"
    },
    {
        name : "송정우",
        location : "분당",
        age : 23,
        hobby : "농구보기"
    },
    {
        name : "이현종",
        location : "인천",
        age : 25,
        hobby : "얘기들어주기"
    },
    {   
        name : "홍혜림",
        location : "오리역",
        age : 23,
        hobby : "집콕하기"
    }   
]

const members = function (a){
    var member = []
    for(var i = 0; i < a.length; i++){
        member.push(a[i]);
    }
    return member
}

console.log(members(serverMembers));

