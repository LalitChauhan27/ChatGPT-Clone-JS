const API_KEY= "abc"; //Replace abc with your API Key
const submitButton = document.querySelector("#submit");
const outPutElement = document.querySelector("#output");
const inPutElement = document.querySelector("input");
const historyElement = document.querySelector(".history");
const buttonElement = document.querySelector("button");

function changeInput(value){
    const inputElement = document.querySelector('input');
    inputElement.value = value;
}

async function getMessage(){
    try{
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            "messages": [
                {
                  "role": "user",
                  "content": inPutElement.value
                }
              ]
        })
    })
    const data = await response.json();
    outPutElement.textContent = data.choices[0].message.content;
    if(data.choices[0].message.content && inPutElement.value){
        const pElement = document.createElement('p');
        pElement.textContent = inPutElement.value;
        pElement.addEventListener('click', ()=>{changeInput(pElement.textContent)});
        historyElement.append(pElement);
    }
    }
    catch (error){
        console.error(error);
    }
}

submitButton.addEventListener('click', getMessage);

function clearInput(){
    inPutElement.value = '';
}

buttonElement.addEventListener('click', clearInput);