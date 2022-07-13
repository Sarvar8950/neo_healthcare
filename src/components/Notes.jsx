import React from "react"
import Card from "./Card"
import "./notes.css"

export function Notes() {
    const [name, setname] = React.useState("")
    const [description, setdescription] = React.useState("")
    const [date, setdate] = React.useState("")
    const [notesdata, setnotesdata] = React.useState([])
    const [count, setcount] = React.useState(0)
    React.useEffect(() => {
        // fetch('http://localhost:3001/notes')
        //     .then((res) => res.json())
        //     .then((res) => setnotesdata(res))
        //     .catch(() => alert("Run json-server on 3001"))
        var updatedata = []
        fetch('http://localhost:3001/notes')
            .then((res) => res.json())
            .then((res) => {
                res.map((ele) => {
                    if (ele.timer === 0) {
                        ele.status = "completed"
                    } else if (ele.timer - new Date().getTime() > 0) {
                        ele.status = "pending"
                    } else {
                        ele.status = "failed"
                    }
                    updatedata = [...updatedata, ele]
                })
            })
        setTimeout(() => {
            if (updatedata.length > 0) {
                setnotesdata([...updatedata])
                // fetch('http://localhost:3001/notes', {
                //     method: "PUT",
                //     data: JSON.stringify(notesdata),
                //     headers: {
                //         'Content-Type': 'application/json',
                //     }
                // })
            } else {
                fetch('http://localhost:3001/notes')
                    .then((res) => res.json())
                    .then((res) => setnotesdata(res))
                    .catch(() => alert("Run json-server on 3001"))
            }
        }, 100);
        setcount(0)
    }, [count])

    function createcard(e) {
        e.preventDefault();
        if (name === "" || date === "" || description === "") {
            alert("All fields are required")
            return;
        }
        var a = date.split(":").map(Number)
        a[0] = a[0] - (new Date().getHours())
        a[1] = a[1] - (new Date().getMinutes())
        var b = ((a[0] * 60 * 60) + (a[1] * 60)) * 1000
        var obj = {
            name: name,
            description: description,
            timer: b + new Date().getTime(),
            date: date,
            status: "pending"
        }

        try {
            fetch('http://localhost:3001/notes', {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(() => setcount(1))
            setdate("")
            setdescription("")
            setname("")
        } catch (error) {
            alert(error)
        }

    }

    return (
        <section className="notesapp">
            <h1 style={{ textAlign: "center", fontSize: "50px", marginTop: "30px" }}>Notes App</h1>
            <div className="notes">
                <form className="form" onSubmit={createcard}>
                    <input type="text" placeholder="Subject" value={name} name="author" onChange={e => setname(e.target.value)} />
                    <input type="text" placeholder="details" value={description} name="details" onChange={e => setdescription(e.target.value)} />
                    <input type="time" placeholder="time" value={date} name="date" onChange={e => setdate(e.target.value)} />
                    <input type="submit" className="submitbtn" value="Create Card" />
                </form>
                <div className="cards" >
                    {
                        notesdata.length === 0 ? <h1>No data to show</h1> : notesdata.map((ele) => <Card key={ele.id} details={ele} setcount={setcount} setnotesdata={setnotesdata} />)
                    }
                </div>
            </div>
        </section>
    )
}
