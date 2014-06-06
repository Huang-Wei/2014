var team = {
  // Group A
  "a1": {
    "id": "bra",
    "name": "巴西",
    "group": "A组"
  },
  "a2": {
    "id": "cro",
    "name": "克罗地亚",
    "group": "A组"
  },
  "a3": {
    "id": "mex",
    "name": "墨西哥",
    "group": "A组"
  },
  "a4": {
    "id": "cmr",
    "name": "喀麦隆",
    "group": "A组"
  },
  // Group B
  "b1": {
    "id": "esp",
    "name": "西班牙",
    "group": "B组"
  },
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
  "b4": {
    "id": "aus",
    "name": "澳大利亚",
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
  "c3": {
    "id": "civ",
    "name":"科特迪瓦",
    "group":"C组"
  },
  "c4": {
    "id": "jpn",
    "name":"日本",
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
  "d3": {
    "id": "eng",
    "name":"英格兰",
    "group":"D组"
  },
  "d4": {
    "id": "ita",
    "name":"意大利",
    "group":"D组"
  },
  // Group E
  "e1": {
    "id": "sui",
    "name":"瑞士",
    "group":"E组"
  },
  "e2": {
    "id": "ecu",
    "name":"厄瓜多尔",
    "group":"E组"
  },
  "e3": {
    "id": "fra",
    "name":"法国",
    "group":"E组"
  },
  "e4": {
    "id": "hon",
    "name":"洪都拉斯",
    "group":"E组"
  },
  // Group F
  "f1": {
    "id": "arg",
    "name":"阿根廷",
    "group":"F组"
  },
  "f2": {
    "id": "bih",
    "name":"波黑",
    "group":"F组"
  },
  "f3": {
    "id": "irn",
    "name":"伊朗",
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
  "g2": {
    "id": "por",
    "name":"葡萄牙",
    "group":"G组"
  },
  "g3": {
    "id": "gha",
    "name":"加纳",
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
  },
  "h3": {
    "id": "rus",
    "name":"俄罗斯",
    "group":"H组"
  },
  "h4": {
    "id": "kor",
    "name":"韩国",
    "group":"H组"
  }
};

db.match.insert(
  {"no":1,
  "team1":team.a1.name,
  "flag1":team.a1.id,
  "group":team.a1.group,
  "team2":team.a2.name,
  "flag2":team.a2.id,
  "time":new Date(Date.UTC(2014,5,12,20,00)),
  "stage":"小组赛"}
);
db.match.insert(
  {"no":2,
  "team1":team.a3.name,
  "flag1":team.a3.id,
  "group":team.a3.group,
  "team2":team.a4.name,
  "flag2":team.a4.id,
  "time":new Date(Date.UTC(2014,5,13,16,00)),
  "stage":"小组赛"}
);
db.match.insert(
  {"no":3,
  "team1":team.b1.name,
  "flag1":team.b1.id,
  "group":team.b1.group,
  "team2":team.b2.name,
  "flag2":team.b2.id,
  "time":new Date(Date.UTC(2014,5,13,19,00)),
  "stage":"小组赛"}
);
db.match.insert(
  {"no":4,
  "team1":team.b3.name,
  "flag1":team.b3.id,
  "group":team.b3.group,
  "team2":team.b4.name,
  "flag2":team.b4.id,
  "time":new Date(Date.UTC(2014,5,13,22,00)),
  "stage":"小组赛"}
);
db.match.insert(
  {"no":5,
  "team1":team.c1.name,
  "flag1":team.c1.id,
  "group":team.c1.group,
  "team2":team.c2.name,
  "flag2":team.c2.id,
  "time":new Date(Date.UTC(2014,5,14,16,00)),
  "stage":"小组赛"}
);
db.match.insert(
  {"no":6,
  "team1":team.d1.name,
  "flag1":team.d1.id,
  "group":team.d1.group,
  "team2":team.d2.name,
  "flag2":team.d2.id,
  "time":new Date(Date.UTC(2014,5,14,19,00)),
  "stage":"小组赛"}
);
db.match.insert(
  {"no":7,
  "team1":team.d3.name,
  "flag1":team.d3.id,
  "group":team.d3.group,
  "team2":team.d4.name,
  "flag2":team.d4.id,
  "time":new Date(Date.UTC(2014,5,14,22,00)),
  "stage":"小组赛"}
);
db.match.insert(
  {"no":8,
  "team1":team.c3.name,
  "flag1":team.c3.id,
  "group":team.c3.group,
  "team2":team.c4.name,
  "flag2":team.c4.id,
  "time":new Date(Date.UTC(2014,5,15,01,00)),
  "stage":"小组赛"}
);
db.match.insert(
  {"no":9,
  "team1":team.e1.name,
  "flag1":team.e1.id,
  "group":team.e1.group,
  "team2":team.e2.name,
  "flag2":team.e2.id,
  "time":new Date(Date.UTC(2014,5,15,16,00)),
  "stage":"小组赛"}
);
db.match.insert(
  {"no":10,
  "team1":team.e3.name,
  "flag1":team.e3.id,
  "group":team.e3.group,
  "team2":team.e4.name,
  "flag2":team.e4.id,
  "time":new Date(Date.UTC(2014,5,15,19,00)),
  "stage":"小组赛"}
);
db.match.insert(
  {"no":11,
  "team1":team.f1.name,
  "flag1":team.f1.id,
  "group":team.f1.group,
  "team2":team.f2.name,
  "flag2":team.f2.id,
  "time":new Date(Date.UTC(2014,5,15,22,00)),
  "stage":"小组赛"}
);
db.match.insert(
  {"no":12,
  "team1":team.g1.name,
  "flag1":team.g1.id,
  "group":team.g1.group,
  "team2":team.g2.name,
  "flag2":team.g2.id,
  "time":new Date(Date.UTC(2014,5,16,16,00)),
  "stage":"小组赛"}
);
db.match.insert(
  {"no":13,
  "team1":team.f3.name,
  "flag1":team.f3.id,
  "group":team.f3.group,
  "team2":team.f4.name,
  "flag2":team.f4.id,
  "time":new Date(Date.UTC(2014,5,16,19,00)),
  "stage":"小组赛"}
);
db.match.insert(
  {"no":14,
  "team1":team.g3.name,
  "flag1":team.g3.id,
  "group":team.g3.group,
  "team2":team.g4.name,
  "flag2":team.g4.id,
  "time":new Date(Date.UTC(2014,5,16,22,00)),
  "stage":"小组赛"}
);
db.match.insert(
  {"no":15,
  "team1":team.h1.name,
  "flag1":team.h1.id,
  "group":team.h1.group,
  "team2":team.h2.name,
  "flag2":team.h2.id,
  "time":new Date(Date.UTC(2014,5,17,16,00)),
  "stage":"小组赛"}
);
db.match.insert(
  {"no":16,
  "team1":team.a1.name,
  "flag1":team.a1.id,
  "group":team.a1.group,
  "team2":team.a3.name,
  "flag2":team.a3.id,
  "time":new Date(Date.UTC(2014,5,17,19,00)),
  "stage":"小组赛"}
);
db.match.insert(
  {"no":17,
  "team1":team.h3.name,
  "flag1":team.h3.id,
  "group":team.h3.group,
  "team2":team.h4.name,
  "flag2":team.h4.id,
  "time":new Date(Date.UTC(2014,5,17,22,00)),
  "stage":"小组赛"}
);
db.match.insert(
  {"no":18,
  "team1":team.b4.name,
  "flag1":team.b4.id,
  "group":team.b4.group,
  "team2":team.b2.name,
  "flag2":team.b2.id,
  "time":new Date(Date.UTC(2014,5,18,16,00)),
  "stage":"小组赛"}
);
db.match.insert(
  {"no":19,
  "team1":team.b1.name,
  "flag1":team.b1.id,
  "group":team.b1.group,
  "team2":team.b3.name,
  "flag2":team.b3.id,
  "time":new Date(Date.UTC(2014,5,18,19,00)),
  "stage":"小组赛"}
);
db.match.insert(
  {"no":20,
  "team1":team.a4.name,
  "flag1":team.a4.id,
  "group":team.a4.group,
  "team2":team.a2.name,
  "flag2":team.a2.id,
  "time":new Date(Date.UTC(2014,5,18,22,00)),
  "stage":"小组赛"}
);
db.match.insert(
  {"no":21,
  "team1":team.c1.name,
  "flag1":team.c1.id,
  "group":team.c1.group,
  "team2":team.c3.name,
  "flag2":team.c3.id,
  "time":new Date(Date.UTC(2014,5,19,16,00)),
  "stage":"小组赛"}
);
db.match.insert(
  {"no":22,
  "team1":team.d1.name,
  "flag1":team.d1.id,
  "group":team.d1.group,
  "team2":team.d3.name,
  "flag2":team.d3.id,
  "time":new Date(Date.UTC(2014,5,19,19,00)),
  "stage":"小组赛"}
);
db.match.insert(
  {"no":23,
  "team1":team.c4.name,
  "flag1":team.c4.id,
  "group":team.c4.group,
  "team2":team.c2.name,
  "flag2":team.c2.id,
  "time":new Date(Date.UTC(2014,5,19,22,00)),
  "stage":"小组赛"}
);
db.match.insert(
  {"no":24,
  "team1":team.d4.name,
  "flag1":team.d4.id,
  "group":team.d4.group,
  "team2":team.d2.name,
  "flag2":team.d2.id,
  "time":new Date(Date.UTC(2014,5,20,16,00)),
  "stage":"小组赛"}
);
db.match.insert(
  {"no":25,
  "team1":team.e1.name,
  "flag1":team.e1.id,
  "group":team.e1.group,
  "team2":team.e3.name,
  "flag2":team.e3.id,
  "time":new Date(Date.UTC(2014,5,20,20,00)),
  "stage":"小组赛"}
);
db.match.insert(
  {"no":26,
  "team1":team.e4.name,
  "flag1":team.e4.id,
  "group":team.e4.group,
  "team2":team.e2.name,
  "flag2":team.e2.id,
  "time":new Date(Date.UTC(2014,5,20,22,00)),
  "stage":"小组赛"}
);
db.match.insert(
  {"no":27,
  "team1":team.f1.name,
  "flag1":team.f1.id,
  "group":team.f1.group,
  "team2":team.f3.name,
  "flag2":team.f3.id,
  "time":new Date(Date.UTC(2014,5,21,16,00)),
  "stage":"小组赛"}
);
db.match.insert(
  {"no":28,
  "team1":team.g1.name,
  "flag1":team.g1.id,
  "group":team.g1.group,
  "team2":team.g3.name,
  "flag2":team.g3.id,
  "time":new Date(Date.UTC(2014,5,21,19,00)),
  "stage":"小组赛"}
);
db.match.insert(
  {"no":29,
  "team1":team.f4.name,
  "flag1":team.f4.id,
  "group":team.f4.group,
  "team2":team.f2.name,
  "flag2":team.f2.id,
  "time":new Date(Date.UTC(2014,5,21,22,00)),
  "stage":"小组赛"}
);
db.match.insert(
  {"no":30,
  "team1":team.h1.name,
  "flag1":team.h1.id,
  "group":team.h1.group,
  "team2":team.h3.name,
  "flag2":team.h3.id,
  "time":new Date(Date.UTC(2014,5,22,16,00)),
  "stage":"小组赛"}
);
db.match.insert(
  {"no":31,
  "team1":team.h4.name,
  "flag1":team.h4.id,
  "group":team.h4.group,
  "team2":team.h2.name,
  "flag2":team.h2.id,
  "time":new Date(Date.UTC(2014,5,22,19,00)),
  "stage":"小组赛"}
);
db.match.insert(
  {"no":32,
  "team1":team.g4.name,
  "flag1":team.g4.id,
  "group":team.g4.group,
  "team2":team.g2.name,
  "flag2":team.g2.id,
  "time":new Date(Date.UTC(2014,5,22,22,00)),
  "stage":"小组赛"}
);
db.match.insert(
  {"no":33,
  "team1":team.b4.name,
  "flag1":team.b4.id,
  "group":team.b4.group,
  "team2":team.b1.name,
  "flag2":team.b1.id,
  "time":new Date(Date.UTC(2014,5,23,16,00)),
  "stage":"小组赛"}
);
db.match.insert(
  {"no":34,
  "team1":team.b2.name,
  "flag1":team.b2.id,
  "group":team.b2.group,
  "team2":team.b3.name,
  "flag2":team.b3.id,
  "time":new Date(Date.UTC(2014,5,23,16,00)),
  "stage":"小组赛"}
);
db.match.insert(
  {"no":35,
  "team1":team.a4.name,
  "flag1":team.a4.id,
  "group":team.a4.group,
  "team2":team.a1.name,
  "flag2":team.a1.id,
  "time":new Date(Date.UTC(2014,5,23,20,00)),
  "stage":"小组赛"}
);
db.match.insert(
  {"no":36,
  "team1":team.a2.name,
  "flag1":team.a2.id,
  "group":team.a2.group,
  "team2":team.a3.name,
  "flag2":team.a3.id,
  "time":new Date(Date.UTC(2014,5,23,20,00)),
  "stage":"小组赛"}
);
db.match.insert(
  {"no":37,
  "team1":team.d4.name,
  "flag1":team.d4.id,
  "group":team.d4.group,
  "team2":team.d1.name,
  "flag2":team.d1.id,
  "time":new Date(Date.UTC(2014,5,24,16,00)),
  "stage":"小组赛"}
);
db.match.insert(
  {"no":38,
  "team1":team.d2.name,
  "flag1":team.d2.id,
  "group":team.d2.group,
  "team2":team.d3.name,
  "flag2":team.d3.id,
  "time":new Date(Date.UTC(2014,5,24,16,00)),
  "stage":"小组赛"}
);
db.match.insert(
  {"no":39,
  "team1":team.c4.name,
  "flag1":team.c4.id,
  "group":team.c4.group,
  "team2":team.c1.name,
  "flag2":team.c1.id,
  "time":new Date(Date.UTC(2014,5,24,20,00)),
  "stage":"小组赛"}
);
db.match.insert(
  {"no":40,
  "team1":team.c2.name,
  "flag1":team.c2.id,
  "group":team.c2.group,
  "team2":team.c3.name,
  "flag2":team.c3.id,
  "time":new Date(Date.UTC(2014,5,24,20,00)),
  "stage":"小组赛"}
);
db.match.insert(
  {"no":41,
  "team1":team.f4.name,
  "flag1":team.f4.id,
  "group":team.f4.group,
  "team2":team.f1.name,
  "flag2":team.f1.id,
  "time":new Date(Date.UTC(2014,5,25,16,00)),
  "stage":"小组赛"}
);
db.match.insert(
  {"no":42,
  "team1":team.f2.name,
  "flag1":team.f2.id,
  "group":team.f2.group,
  "team2":team.f3.name,
  "flag2":team.f3.id,
  "time":new Date(Date.UTC(2014,5,25,16,00)),
  "stage":"小组赛"}
);
db.match.insert(
  {"no":43,
  "team1":team.e4.name,
  "flag1":team.e4.id,
  "group":team.e4.group,
  "team2":team.e1.name,
  "flag2":team.e1.id,
  "time":new Date(Date.UTC(2014,5,25,20,00)),
  "stage":"小组赛"}
);
db.match.insert(
  {"no":44,
  "team1":team.e2.name,
  "flag1":team.e2.id,
  "group":team.e2.group,
  "team2":team.e3.name,
  "flag2":team.e3.id,
  "time":new Date(Date.UTC(2014,5,25,20,00)),
  "stage":"小组赛"}
);
db.match.insert(
  {"no":45,
  "team1":team.g4.name,
  "flag1":team.g4.id,
  "group":team.g4.group,
  "team2":team.g1.name,
  "flag2":team.g1.id,
  "time":new Date(Date.UTC(2014,5,26,16,00)),
  "stage":"小组赛"}
);
db.match.insert(
  {"no":46,
  "team1":team.g2.name,
  "flag1":team.g2.id,
  "group":team.g2.group,
  "team2":team.g3.name,
  "flag2":team.g3.id,
  "time":new Date(Date.UTC(2014,5,26,16,00)),
  "stage":"小组赛"}
);
db.match.insert(
  {"no":47,
  "team1":team.h4.name,
  "flag1":team.h4.id,
  "group":team.h4.group,
  "team2":team.h1.name,
  "flag2":team.h1.id,
  "time":new Date(Date.UTC(2014,5,26,20,00)),
  "stage":"小组赛"}
);
db.match.insert(
  {"no":48,
  "team1":team.h2.name,
  "flag1":team.h2.id,
  "group":team.h2.group,
  "team2":team.h3.name,
  "flag2":team.h3.id,
  "time":new Date(Date.UTC(2014,5,26,20,00)),
  "stage":"小组赛"}
);

db.user.ensureIndex({"user":1},{"unique":true})
db.circle.ensureIndex({"name":1},{"unique":true})
db.bet.ensureIndex({"betscore":-1})
db.bet.ensureIndex({"user":1})