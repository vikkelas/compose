const form = document.querySelector('.myForm');
if(form){
    form.addEventListener('submit',(e)=>{
        e.preventDefault()
        const url = document.location.origin;
        const id = e.currentTarget.dataset.id
        if(!id){
            const formData = new FormData(form);
            fetch(url, {
                method: "POST",
                body: formData
            }).then(r=>window.location.href = r.url)
        }else{
            const formData = new FormData(form);
            fetch(`${url}/update/${id}`, {
                method: "PUT",
                body: formData
            }).then(r=>window.location.href = r.url)
        }
    })
}

