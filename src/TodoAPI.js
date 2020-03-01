import request from 'superagent';

export function getTodoData() {
    return request.get(`https://cryptic-coast-58268.herokuapp.com/api/todos`);
}