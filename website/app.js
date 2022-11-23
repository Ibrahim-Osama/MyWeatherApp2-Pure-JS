let button = document.getElementById('send_data')
let input = document.getElementById('code')
let feel = document.getElementById('feel')
let Code_Detials = document.getElementById('Code_Detials')
let datecode = new Date();
let date = datecode.toDateString();

let fetchdata = async(url)=>
{
   try
   {
    let ruslt = await fetch(url)
    let recive_data = await ruslt.json()
    recive_data.cod==200?  console.log(recive_data):alert("City Not Found")
    return recive_data
   }
   catch(e)
   {
    console.log(e);
   }

};








let filterdata = async(recive_data)=>
{
   try
   {
    if(recive_data.message)
    {
        let filter = recive_data.message
        console.log(filter);
        return filter
    }
    else
    {
        let filter = 
    {
        recive_data,
        feel:feel.value,
        temp:recive_data.main.temp
    }
    console.log(filter);
     return filter
    }
 
   }
   catch(e)
   {
   
   }


};


let potdata = async(url=`` ,recivedata={})=>
{
    let data = await fetch(url,
    {
        method:'POST',
        credentials:"same-origin",
        headers:
        {
            "Content-Type":"application/json"
        },
        body:JSON.stringify(recivedata)
        
        
        })
       
        try 
        {
            let respones = await data.json()
            console.log(respones);
            return respones
        }
   catch(e)
   {
    console.error(e)
   }


};







let restoredata = async(urldata)=>
{
        let data = await fetch(urldata)
        try
        {
            let res = await data.json()
            console.log(res);
            return res
        }
        catch(e)
        {
            console.log(e);
        }
};


let dataudatedui = async(updatedata)=>
{
    let res = await updatedata
    console.log(res);
   let fee= res.feel?res.feel:feel.value
    if(res.feel)
    {
        fee = res.feel
    }
    else
    {
        fee = 'What do u feel'
    }
    Code_Detials.innerHTML=`temp is : ${res.temp} Weather :${res.recive_data.weather[0].description} and country is ${res.recive_data.sys.country} and ${fee}`
      



}

button.addEventListener('click',(e)=>
{
    let zipcode = `https://api.openweathermap.org/data/2.5/weather?zip=${input.value}&appid=e404c1fdc324b27196f6f70ff0199d16&units=imperial`
    console.log(zipcode);
    fetchdata(zipcode).then((rezult) =>
    {
        filterdata(rezult).then(Filter_rezult=>
    {
        potdata("/add",Filter_rezult).then((data)=>
    {
        restoredata("/all").then((updatedata)=>
        {
            dataudatedui(updatedata)
        })
    })
    })
    })
    
    e.preventDefault();
})