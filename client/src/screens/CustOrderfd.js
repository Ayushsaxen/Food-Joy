import React, { useEffect, useState } from 'react'

export default function CustOrderfd() {
 const [odata,setOdata]=useState([]);

    async function loadData() {
        try {
            let response = await fetch("http://localhost:5000/api/custorderdata", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({custEmail:localStorage.getItem("userEmail")})
            });
            response = await response.json();
            setOdata(response);
           
        } catch (err) {
           
        }
    }
    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md" >
                <table className="table table.hover">
                    <thead className="text-success fs-4">
                        <tr>
                            <th scope="col" style={{ color: "white" }}>#</th>
                            <th scope="col" style={{ color: "white" }}>Date</th>

                            <th scope="col" style={{ color: "white" }}>Price</th>
                            <th scope="col" style={{ color: "white" }}>Orders</th>

                        </tr>
                    </thead>
                    <tbody>
                
                {odata.map((order,index) =>{
                    return(<tr key={index} style={{color:"white"}}>
                        <th scope="row" style={{color:"white"}}> {index+1}</th>
                        <td style={{color:"white"}}>{order.date}</td>
                        <td style={{color:"white"}}>{order.price}</td>
                        
                        <td style={{color:"white"}}>{order.order_data.map((item,index)=>item.name+ "  ")}</td>

                      

                    </tr>) 
                })}
            </tbody>

                </table>
            </div>
        </div>
    )
}
