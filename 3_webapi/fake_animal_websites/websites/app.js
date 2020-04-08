document.getElementById('generate').addEventListener('click',performAction);

function performAction(evt){
    const animal = document.getElementById('animal').value;
    const favorite = document.getElementById('favorite').value;

    //1.get animal data from user input on client side
    //2.post animal data to server
    //3.update UI
    getAnimal('/fakeAnimalData')
        .then((data)=>{
            console.log('here',data);
            postData('/addAnimal',{animal:animal,fact: data.fact,favorite:favorite});
        })
        .then(updateUI())
}

const getAnimal = async (url='')=>{
    //1.Wait till data available at url, Fetch url where store animal data
    const res = await fetch(url);
    //2.Wait till fetching is successful, then put to data 
    try{
        const data = await res.json();
        console.log('In client get animal',data)
        return data;
    }catch(error){
        console.log(`error ${error}`);
    }
}

const postData = async (url='',data1 ={})=>{
    console.log('In client, begin post data',data1);
    //1.Wait till data available at url
    const res = await fetch(url,{
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data1),
    });
    console.log('Reach middle of client post data');
    //2.
    try{
        const newData = await res.json();
        console.log('In client post data',newData);

        return newData;
    }catch(error){
        console.log(`error ${error}`);
    }
}

const updateUI = async () => {
    const request = await fetch('/all');
    try{
      const allData = await request.json();
      console.log('In update UI',allData);
      document.getElementById('animalName').innerHTML = allData[allData.length-1].animal;
      document.getElementById('animalFact').innerHTML = allData[allData.length-1].fact;  
    }catch(error){
      console.log("error", error);
    }
  }