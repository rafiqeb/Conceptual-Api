//   All data function

const loadData = async(status, searchText) => {
    
    document.getElementById('spin').classList.add('hidden')
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText?searchText : 'iphone'}`)
    const data = await res.json()
    
    if(status){
        displayData(data.data)
    }
    else{
        displayData(data.data.slice(0,6))
    }
    
}


// Display data function
const displayData = (phones) => {
    document.getElementById('phone-container').innerHTML= '';
    const phoneContainer = document.getElementById('phone-container')

    phones.forEach(item => {
        
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="card p-4">
                    <img src="${item.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${item.phone_name}</h5>
                        <p class="card-text">${item.slug}</p>
                        <button onclick="phoneDetails('${item.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
                        
                    </div>
                </div>
        `
        phoneContainer.append(div)
    });
}

const showAllData = () => {
    loadData(true)
    
}

// Search button function
const searchPost = () => {
    document.getElementById('spin').classList.remove('hidden')
    const searchText = document.getElementById('search-box').value;


    setTimeout(function(){
        loadData(false, searchText)
    },3000)
}

//   Function call
loadData(false, 'iphone')

// Phone details function
const phoneDetails = async (slug) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
    const data = await res.json()
    const item = data.data
    console.log(item)
    const modalContent = document.getElementById('modal-content')

    modalContent.innerHTML = `
    <dialog id="my_modal_1" class="modal">
                    <div class="modal-box">
                        <h3 class="text-lg font-bold">${item.brand}</h3>
                        <p class="py-4">Press ESC key or click the button below to close</p>
                        <div class="modal-action">
                            <form method="dialog">
                                <!-- if there is a button in form, it will close the modal -->
                                <button class="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
    `
    my_modal_1.showModal()
}

