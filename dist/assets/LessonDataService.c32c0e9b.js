import{h as t}from"./http-common.77a361c3.js";class o{getAllLessons(s){return t.get(`/tutorials/${s}/lessons`)}getLesson(s,e){return t.get(`/tutorials/${s}/lessons/${e}`)}createLesson(s,e){return t.post(`/tutorials/${s}/lessons`,e)}updateLesson(s,e,r){return t.put(`/tutorials/${s}/lessons/${e}`,r)}deleteLesson(s,e){return t.delete(`/tutorials/${s}/lessons/${e}`)}}var l=new o;export{l as L};
