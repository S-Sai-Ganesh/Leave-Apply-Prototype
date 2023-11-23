const leave_form = document.getElementById('leave');
const date = document.getElementById('date');
const token = localStorage.getItem('token');


leave_form.addEventListener('submit', onSubmit);

function onSubmit(e){
    e.preventDefault();
    console.log(date.value.toString());
    let dateObj = {
        date: date.value.toString()
    }

    axios.post('http:/localhost:3000/leave/apply', dateObj, { headers: {'Authorization': token} })
        .then((response) => {
            //addNewLineElement(response.data); To get from database and display leaves and show approved or not.
            console.log('Success');
        }).catch((err) => {
            document.body.innerHTML+= '<h6> Submit failed try again</h6>'
            console.log(err);      
        });

}