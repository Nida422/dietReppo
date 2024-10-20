const inputText=document.getElementById('myInput');
const responseText=document.getElementById('res-text');
const aiTextElements=document.getElementsByClassName('ai');

document.getElementById('myButton').addEventListener('click',pushCode);

function pushCode(){
    responseText.innerHTML=inputText.value;
    aiResponse();
}

async function aiResponse() {
    try{
        const response=await fetch(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyB65nXpyj8MPTbPquFRqgTeSWIIxV6j_vA',
            {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    contents:[{parts:[{text:inputText.value}]}],
                }),
            }
        );
        const responseData=await response.json();
        const answer=responseData.candidates[0].content.parts[0].text;
        for(let i=0;i<aiTextElements.length;i++){
            aiTextElements[i].innerHTML=answer;
        }
    }catch(error){
        console.log('Error',error);
    }
}