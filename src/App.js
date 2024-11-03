import React, {useState} from "react";
import Container from "@mui/material/Container"


function App() {
    const [searchItem, setSearchItem] = useState('')
    const [searchItem2, setSearchItem2] = useState('')
    const [searchItem3, setSearchItem3] = useState('')
    const [searchItem4, setSearchItem4] = useState('')
    const [results, setResults] = useState([])


    const Header = () => {
        return (
            <Container maxWidth="md">
                <div style={{background: '#004990',textAlign: 'center'}}>
                    <header>
                        <h1 style={{color: 'white', lineHeight: 1.5, fontSize: 100, textAlign: 'center'}}>Dormganizer</h1>
                    </header>
                </div>
            </Container>
        );
    };

    const handleInputChange = (e) => {
        const searchTerm = e.target.value;
        setSearchItem(searchTerm)
    }
    const handleInputChange2 = (a) => {
        const searchTerm2 = a.target.value;
        setSearchItem2(searchTerm2)
    }
    const handleInputChange3 = (b) => {
        const searchTerm3 = b.target.value;
        setSearchItem3(searchTerm3)
    }
    const handleInputChange4 = (c) => {
        const searchTerm4 = c.target.value;
        setSearchItem4(searchTerm4)
    }

    const onSearch = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/search', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({query: searchItem, height: searchItem2, width: searchItem3, length: searchItem4}),
            })
            const data = await response.json()
            console.log(data);
            setResults(data)
        } catch (error){
            console.error("Error fetching results:", error)
        }
        console.log(searchItem)
    }
    

    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 10}}>
            <Header/>
            <p style={{textAlign: 'center', color: '#004990', fontSize: 30}}>
                Welcome to Dormganizer! Tell us what furniture you are looking for and your maximum dimensions
                and we'll give you a list of perfectly sized furniture for your limited space!
            </p>
            <Container maxWidth="s">
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: 85}}>
                    <input
                        style={{fontSize: 30, width: 9000, padding: 20}}
                        type="text"
                        value={searchItem}
                        onChange={handleInputChange}
                        placeholder='Furniture type'
                    />
                    <input
                        style={{fontSize: 30, width: 150, padding: 20}}
                        type="text"
                        value={searchItem2}
                        onChange={handleInputChange2}
                        placeholder='Height'
                    />

                    <input
                        style={{fontSize: 30, width: 150, padding: 20}}
                        type="text"
                        value={searchItem3}
                        onChange={handleInputChange3}
                        placeholder='Width'
                    />
                    <input
                        style={{fontSize: 30, width: 150, padding: 20}}
                        type="text"
                        value={searchItem4}
                        onChange={handleInputChange4}
                        placeholder='Length'
                    /> 
                    <button onClick={onSearch}>Search</button> 
                </div>
            </Container>
            <Container>  
                {results.map(result => (
                    result.name !== "" ? (
                        <div key = {result.id}>
                            <h3>{result.name}</h3>
                            <img style={{ width: "50%", height: "50%" }} src={result.contextualImageUrl} alt="Product" />
                            <p>IKEA</p>
                            <p>{result.price}</p>
                            <p>{result.height}</p>
                            <p>{result.width}</p>
                            <p>{result.length}</p>
                        </div>
                    ) : null
                ))}
            </Container>
        </div>

    )

}

export default App