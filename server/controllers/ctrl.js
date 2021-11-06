const fortunes = [
    "A golden egg of opportunity falls into your lap this month.",
    "A good friendship is often more important than a passionate romance.",
    "Advice is like kissing. It costs nothing and is a pleasant thing to do. (2)",
    "It is better to deal with problems before they arise.",
    "Keep your face to the sunshine and you will never see shadows."
];
let globalID = 1;
let images = {};

//characters that will be scrambled, can add any you want to get scrambled as long as it's even
let alphStrKey = "abcdefghijklmnopqrstuvwxyz! ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#";
 //if the key isn't an even number it won't work as good as we would like so we take away one
if(alphStrKey.length % 2 !== 0){
    console.log("You need to remove 1 char from alphStrKey");
}

module.exports = {
    getFortune: (req, res) => {
        console.log("Fortune Endpoint Hit");
        let randNum = Math.floor(Math.random() * 5);
        res.status(200).send(fortunes[randNum]);
    },
    encodeText: (req,res) => {
        //if supplied no key we will generate a new cypher object with a new key
        if(req.body.key === ""){
            let cyphObj = newCypherObj();
            let encryptedText = cypher(req.body.text,cyphObj);
            res.status(200).send({text: encryptedText, key: cyphObj.cyphStrKey});
        } else {
            //if the key doesn't match our original keys length we know its been corrupted
            if(req.body.key.length != alphStrKey.length){
                res.status(200).send({text:`Your key has been corrupted.\nPlease leave cypher key field blank.\nWe will supply you with a new key`});
            } else {
                //this runs if the user supplied us with a non corrupted key
                let cyphObj = createCypherFrom(req.body.key);
                let encryptedText = cypher(req.body.text,cyphObj);
                res.status(200).send({text: encryptedText, key:"given"});
            }
        }
    },
    decypher: (req,res) => {
        console.log(req.body);
        if(req.body.key === "" || req.body.key.length !== alphStrKey.length){
            res.status(200).send({text:"You're Key is corrupt or non-existant"});
        } else {
            let cyphObj = createCypherFrom(req.body.key);
            let decpyheredText = decypher(req.body.text,cyphObj);
            res.status(200).send({text: decpyheredText});
        }
    },
    saveImage: (req,res) => {
        let exists = false;
        console.log('checking');
        for(id in images){
            if(images[id].image === req.body.url){
                res.status(200).send("You have already saved that image");
                exists = true;
                return;
            }
        }
        //just double check if the id hasn't been added
        if(!images[globalID] && !exists){
            //add the image object
            images[globalID] = {
                image: req.body.url,
                text: ""
            };
            console.log("added new image");
            console.log(images);
            globalID ++;
            res.status(200).send("Saved the doggo");
        }
        
    },
    requestImages: (req,res) => {
        res.status(200).send(images);
    },
    deleteImage: (req,res) => {
        delete images[req.params.id];
        console.log(req.params);
    },
    updateText: (req,res) => {
        console.log("updated Text");
        console.log(req.params.id);
        console.log(req.body.text);
        images[req.params.id].text = req.body.text;
        res.status(200).send("Updated teh text");
    }
   

}




//Cypher Functions
function cypher(str,cypherObj){
    let output = "";
    for(let i = 0; i < str.length; i ++){
        if(cypherObj.alphDict[str[i]]) output += cypherObj.alphDict[str[i]];
        else output += str[i]; //if I haven't implemented the character just add it as it is
    }
    return output;
}

function decypher(str,cypherObj){
    let output = "";
    for(let i = 0; i < str.length; i ++){
        if(cypherObj.cyphDict[str[i]]) output += cypherObj.cyphDict[str[i]];
        else output += str[i]; //if it wasn't contained in the key I didn't account for it send it back through as it is
    }
    return output;
}

function createCypherFrom(key){
    let cyphStrKey = key;
    let alphDict = {};
    let cyphDict = {};
    //set up the dictionary objects
    for(let i = 0; i < alphStrKey.length; i ++) alphDict[alphStrKey[i]] = cyphStrKey[i];
    for(let i = 0; i < alphStrKey.length; i ++) cyphDict[cyphStrKey[i]] = alphStrKey[i];

    let cypherObj = {
        alphDict: alphDict,
        cyphDict: cyphDict,
        cyphStrKey: key,
        orgKey: alphStrKey
    };
    return cypherObj;
}

function newCypherObj(){
    
    //create an array of the original chars, then iterate through creating a random string from those specific characters
    let arr = [...alphStrKey]
    let randKey = "";
    while(arr.length > 0){
        let index = Math.floor(Math.random() * arr.length);
        randKey += arr[index];
        arr.splice(index,1);
    }
    console.log(`my new KEY: ${randKey}`);
    return createCypherFrom(randKey);
}