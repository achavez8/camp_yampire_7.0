exports.handler = function(context, event, callback) {
	// twiml.say("Hello World");
    let memory = JSON.parse(event.Memory);
    let respObj = {};
    //get answer from Memory
    let q1 = memory.twilio.collected_data.choose_a_name.answers.q1.answer.toLowerCase(); //bug fixed; it was mising the 'answers' method between 'choose_a_name" and 'q1'
    let q2 = memory.twilio.collected_data.choose_a_name.answers.q2.answer.toLowerCase();
    let q3 = memory.twilio.collected_data.choose_a_name.answers.q3.answer.toLowerCase();
    const result = Object.entries(
        [q1, q2, q3].reduce((previous, current) => {
            if(previous[current] === undefined) previous[current]=1;
            else previous[current]++;
            return previous;
        }, {})).reduce((previous, current) => (current[1] >= previous[1] ? current : previous))[0];
    
    var msg = '';
    if(result == 'a'){
        msg = "sounds like Yoga with Adriene's Mediate Challenge will help you in your journey towards mindfulness 😌 https://s3.amazonaws.com/kajabi-storefronts-production/sites/40265/themes/2380946/downloads/RF5B1Tv4SIey2jlpHRll_YWA_May_2020_Yoga_Calendar.pdf";
    }
    else if(result == 'b'){
        msg = "Yoga with Adriene's Courage Challenge will be the fiery yet gentle practice you're craving ⚖️ https://s3.amazonaws.com/kajabi-storefronts-production/sites/40265/themes/2380946/downloads/jb3tIFBXR2iXnGhbfvq6_YWA_June_2020_Yoga_Calendar.pdf";
    }
    else{
        msg = "Yoga with Adriene's Shift Challenge will take you new places 🛫 https://s3.amazonaws.com/kajabi-storefronts-production/sites/40265/themes/2380946/downloads/AVtKKdovQum02YXxQNJg_YWA_July_2020_Yoga_Calendar.pdf";
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
