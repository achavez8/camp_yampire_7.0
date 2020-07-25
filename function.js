exports.handler = function(context, event, callback) {
    let memory = JSON.parse(event.Memory);
    let respObj = {};
    //get answer from Memory
    let q1 = memory.twilio.collected_data.choose_a_name.q1.answer.toLowerCase(); //change "choose_a_name" to the name of your bot. Can be found on 5th line of the "questions.json" file
    let q2 = memory.twilio.collected_data.choose_a_name.q2.answer.toLowerCase();
    let q3 = memory.twilio.collected_data.choose_a_name.q3.answer.toLowerCase();
    const result = Object.entries(
        [q1, q2, q3].reduce((previous, current) => {
            if(previous[current] === undefined) previous[current]=1;
            else previous[current]++;
            return previous;
        }, {})).reduce((previous, current) => (current[1] >= previous[1] ? current : previous))[0];
    
    var msg = '';
    if(result == 'a'){
        msg = "🥁 if the result is mostly As, this prints out (you can add links and emojis) https://www.google.com";
    }
    else if(result == 'b'){
        msg = "message for mostly Bs";
    }
    else {
        msg = "message for mostly Cs";
    }
    respObj = {
        "actions":[
            {
                "say": msg
                
            },
            {
                "redirect": "task://goodbye"
            }]
        };
        callback(null, respObj);
};