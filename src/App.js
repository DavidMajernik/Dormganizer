import React, {useState} from "react";
import Container from "@mui/material/Container"

function App() {
    const [searchItem, setSearchItem] = useState('')
    const [searchItem2, setSearchItem2] = useState('')
    const [searchItem3, setSearchItem3] = useState('')
    const [searchItem4, setSearchItem4] = useState('')


    const Header = () => {
        return (
            <Container maxWidth="md">
                <div style={{background: '#004990'}}>
                    <header>
                        <h1 style={{color: 'white', lineHeight: 1, fontSize: 100, textAlign: 'center'}}>Dormganizer</h1>
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
                </div>
            </Container>
        </div>

    )

}

export default App