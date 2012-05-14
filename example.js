// example with a simple hostname and callback
require("./node-mcstats.js").fetch("myminecraftserver.com", function(data){
    if (data.error){
        console.log("ERROR: "+data.error);
    }else{
        console.log("Message of the day: "+data.motd);
        console.log(data.players+"/"+data.max_players+" player(s) online");
    }
});

// example with a simple hostname and a custom port number
require("./node-mcstats.js").fetch("myminecraftserver2.com", 25565, function(data){
    if (data.error){
        console.log("ERROR: "+data.error);
    }else{
        console.log("Message of the day: "+data.motd);
        console.log(data.players+"/"+data.max_players+" player(s) online");
    }
});