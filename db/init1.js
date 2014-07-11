var team = {
  // Group A
  "a1": {
    "id": "bra",
    "name": "巴西",
    "group": "A组"
  },
  "a3": {
    "id": "mex",
    "name": "墨西哥",
    "group": "A组"
  },
  // Group B
  "b2": {
    "id": "ned",
    "name": "荷兰",
    "group": "B组"
  },
  "b3": {
    "id": "chi",
    "name": "智利",
    "group": "B组"
  },
  // Group C
  "c1": {
    "id": "col",
    "name": "哥伦比亚",
    "group": "C组"
  },
  "c2": {
    "id": "gre",
    "name":"希腊",
    "group":"C组"
  },
  // Group D
  "d1": {
    "id": "uru",
    "name":"乌拉圭",
    "group":"D组"
  },
  "d2": {
    "id": "crc",
    "name":"哥斯达黎加",
    "group":"D组"
  },
  // Group E
  "e1": {
    "id": "sui",
    "name":"瑞士",
    "group":"E组"
  },
  "e3": {
    "id": "fra",
    "name":"法国",
    "group":"E组"
  },
  // Group F
  "f1": {
    "id": "arg",
    "name":"阿根廷",
    "group":"F组"
  },
  "f4": {
    "id": "nga",
    "name":"尼日利亚",
    "group":"F组"
  },
  // Group G
  "g1": {
    "id": "ger",
    "name":"德国",
    "group":"G组"
  },
  "g4": {
    "id": "usa",
    "name":"美国",
    "group":"G组"
  },
  // Group H
  "h1": {
    "id": "bel",
    "name":"比利时",
    "group":"H组"
  },
  "h2": {
    "id": "alg",
    "name":"阿尔及利亚",
    "group":"H组"
  }
};

db.match.insert(
  {"no":49,
  "team1":team.a1.name,
  "flag1":team.a1.id,
  "group":"1/8决赛",
  "team2":team.b3.name,
  "flag2":team.b3.id,
  "time":new Date(Date.UTC(2014,5,28,16,00)),
  "stage":"淘汰赛"}
);

db.match.insert(
  {"no":50,
  "team1":team.c1.name,
  "flag1":team.c1.id,
  "group":"1/8决赛",
  "team2":team.d1.name,
  "flag2":team.d1.id,
  "time":new Date(Date.UTC(2014,5,28,20,00)),
  "stage":"淘汰赛"}
);

db.match.insert(
  {"no":51,
  "team1":team.b2.name,
  "flag1":team.b2.id,
  "group":"1/8决赛",
  "team2":team.a3.name,
  "flag2":team.a3.id,
  "time":new Date(Date.UTC(2014,5,29,16,00)),
  "stage":"淘汰赛"}
);

db.match.insert(
  {"no":52,
  "team1":team.d2.name,
  "flag1":team.d2.id,
  "group":"1/8决赛",
  "team2":team.c2.name,
  "flag2":team.c2.id,
  "time":new Date(Date.UTC(2014,5,29,20,00)),
  "stage":"淘汰赛"}
);

db.match.insert(
  {"no":53,
  "team1":team.e3.name,
  "flag1":team.e3.id,
  "group":"1/8决赛",
  "team2":team.f4.name,
  "flag2":team.f4.id,
  "time":new Date(Date.UTC(2014,5,30,16,00)),
  "stage":"淘汰赛"}
);

db.match.insert(
  {"no":54,
  "team1":team.g1.name,
  "flag1":team.g1.id,
  "group":"1/8决赛",
  "team2":team.h2.name,
  "flag2":team.h2.id,
  "time":new Date(Date.UTC(2014,5,30,20,00)),
  "stage":"淘汰赛"}
);

db.match.insert(
  {"no":55,
  "team1":team.f1.name,
  "flag1":team.f1.id,
  "group":"1/8决赛",
  "team2":team.e1.name,
  "flag2":team.e1.id,
  "time":new Date(Date.UTC(2014,6,1,16,00)),
  "stage":"淘汰赛"}
);

db.match.insert(
  {"no":56,
  "team1":team.h1.name,
  "flag1":team.h1.id,
  "group":"1/8决赛",
  "team2":team.g4.name,
  "flag2":team.g4.id,
  "time":new Date(Date.UTC(2014,6,1,20,00)),
  "stage":"淘汰赛"}
);

db.match.insert(
  {"no":57,
  "team1":team.e3.name,
  "flag1":team.e3.id,
  "group":"1/4决赛",
  "team2":team.g1.name,
  "flag2":team.g1.id,
  "time":new Date(Date.UTC(2014,6,4,16,00)),
  "stage":"淘汰赛"}
);

db.match.insert(
  {"no":58,
  "team1":team.a1.name,
  "flag1":team.a1.id,
  "group":"1/4决赛",
  "team2":team.c1.name,
  "flag2":team.c1.id,
  "time":new Date(Date.UTC(2014,6,4,20,00)),
  "stage":"淘汰赛"}
);

db.match.insert(
  {"no":59,
  "team1":team.f1.name,
  "flag1":team.f1.id,
  "group":"1/4决赛",
  "team2":team.h1.name,
  "flag2":team.h1.id,
  "time":new Date(Date.UTC(2014,6,5,16,00)),
  "stage":"淘汰赛"}
);

db.match.insert(
  {"no":60,
  "team1":team.b2.name,
  "flag1":team.b2.id,
  "group":"1/4决赛",
  "team2":team.d2.name,
  "flag2":team.d2.id,
  "time":new Date(Date.UTC(2014,6,5,20,00)),
  "stage":"淘汰赛"}
);

db.match.insert(
  {"no":61,
  "team1":team.a1.name,
  "flag1":team.a1.id,
  "group":"半决赛",
  "team2":team.g1.name,
  "flag2":team.g1.id,
  "time":new Date(Date.UTC(2014,6,8,20,00)),
  "stage":"淘汰赛"}
);

db.match.insert(
  {"no":62,
  "team1":team.b2.name,
  "flag1":team.b2.id,
  "group":"半决赛",
  "team2":team.f1.name,
  "flag2":team.f1.id,
  "time":new Date(Date.UTC(2014,6,9,20,00)),
  "stage":"淘汰赛"}
);

db.match.insert(
  {"no":63,
  "team1":team.a1.name,
  "flag1":team.a1.id,
  "group":"半决赛",
  "team2":team.b2.name,
  "flag2":team.b2.id,
  "time":new Date(Date.UTC(2014,6,12,20,00)),
  "stage":"淘汰赛"}
);

db.match.insert(
  {"no":64,
  "team1":team.g1.name,
  "flag1":team.g1.id,
  "group":"半决赛",
  "team2":team.f1.name,
  "flag2":team.f1.id,
  "time":new Date(Date.UTC(2014,6,13,19,00)),
  "stage":"淘汰赛"}
);
