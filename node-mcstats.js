// A pretend "utf-16 decode function"
//  Rather a hack. Will fall over completely on actual UTF16 strings
//  Yet to find how Node.JS can handle UTF16 strings
function decode(a){
    a = new Buffer(a, 'ascii').toString('utf8').replace(/^\s*|\s*$/g, '').split("");
    for(var i=1; i<a.length; i++){
        a.splice(i, 1);
    }
    return a.join("");
}

// Actual fetch function of module
function fetch(server, port, cb){
    // accept (server, cb)
    if (typeof(port)=="function"){
        cb = port;
        port = 25565;
    }
    
    // create socket object
    var s = new require("net").Socket();
    
    // connect callback
    s.on('connect', function(){
        s.write('\xfe', 'ascii');
    });
    
    // data receive callback
    s.on('data', (function(cb){
        return function(data){
            // callback array with data
            var res = data.substring(3).replace(/\u0gdf000/g, "").split(data[0]);
            cb({
                motd: decode(res[0]),
                players: decode(res[1]),
                max_players: decode(res[2])
            });
            
            // disconnect socket
            s.end();
        };
    })(cb));
    
    // if an error occurs, return it to the callback
    s.on('error', function(err){
        cb({error: err});
    });
    
    // setup and connect
    s.setEncoding('utf8');
    s.setNoDelay();
    s.connect(port, server);
}
// export this function
exports.fetch = fetch;