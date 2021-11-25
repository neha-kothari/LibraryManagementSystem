import React, { useState } from "react";
// import data from "./data.json";
import Item from "./bookItem";

const Fake = () => {
    let data = [
        {
            "name": "Bootstrap",
            "logo": "https://cdn.worldvectorlogo.com/logos/bootstrap-4.svg",
            "tags": [
                "css",
                "bootstrap",
                "javascript",
                "html",
                "scss",
                "css-framework",
                "sass"
            ]
        },
        {
            "name": "React",
            "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png",
            "tags": ["javascript", "react", "frontend", "declarative", "ui", "library"]
        },
        {
            "name": "Angular",
            "logo": "https://angular.io/assets/images/logos/angular/angular.png",
            "tags": [
                "angular",
                "typescript",
                "web",
                "javascript",
                "pwa",
                "web-framework",
                "web-performance"
            ]
        }
    ]

    const [searchData, setSearchData] = useState(data);
    const searchItem = (query) => {
        if (!query) {
            setSearchData(data);
            return;
        }
        query = query.toLowerCase();

        const finalResult = [];
        data.forEach((item) => {
            if (
                item.name.toLowerCase().indexOf(query) !== -1 ||
                item.tags.includes(query)
            ) {
                finalResult.push(item);
            }
        });
        setSearchData(finalResult);
    };
    return (
        <div>
            <p className="title"> Technologies</p>
            <div className="search-container">
                <input
                    type="search"
                    onChange={(e) => searchItem(e.target.value)}
                    placeholder="Search Technologies"
                />
            </div>

            <div className="item-container">
                {searchData.map((item) => (
                    <Item {...item} key={item.name} />
                ))}
            </div>
        </div>
    );
};

export default Fake;
