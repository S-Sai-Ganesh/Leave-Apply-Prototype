const employeesList = document.getElementById('employees');
const token = localStorage.getItem('token');
var count = 1;

if( document.readyState == 'loading'){

    axios.get('http://localhost:3000/leave/emp-get', { headers: {'Authorization': token} }).then( (result)=>{
        console.log(result);
        result.data.forEach(element => {
            const li = document.createElement('li');

            li.appendChild(document.createTextNode(count + '. ' + element.user.name + '  ' + element.date));
            count++;
            employeesList.append(li);
        });
    })
}