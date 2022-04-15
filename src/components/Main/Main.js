import React, {useEffect} from "react";
import axios from "axios";

import s from './main.module.scss'

import Pizza from "./Pizza/Pizza"

function Main() {
    const [pizzas, setPizzas] = React.useState([]);
    React.useEffect(() => {
        axios.get('http://localhost:3000/db.json').then((resp) => setPizzas(resp.data.pizzas))
    }, []);

    let sortingButton = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые']

    let subMenu = [{name: 'популярности', type: 'popular'}, {name: 'цена', type: 'price'}, {name: 'алфавиту', type: 'alphabet'}]

    const [isActiveSort, setIsActiveSort] = React.useState(0);

    let onSortButton = (index) => {
        setIsActiveSort(index)
    }

    const [isSubMenu, setIsSubMenu] = React.useState(false);

    let toggleSubMenu = () => {
        setIsSubMenu(!isSubMenu)
    }

    const [isActiveSubMenu, setIsActiveSubMenu] = React.useState(0);

    let onActiveSubMenu = (index) => {
        setIsActiveSubMenu(index)
        setIsSubMenu(false)
    }

    const sortRef = React.useRef();

    const handleOutsideClick = (e) => {
        if (!e.path.includes(sortRef.current)) {
            setIsSubMenu(false)
        }
    }

    React.useEffect(() => {
        return () => {
            document.body.addEventListener('click', handleOutsideClick)
        };
    }, []);


    return (
        <div className={s.main}>
            <div className={s.sorting}>
                <div className={s.sortingLeft}>
                    {sortingButton.map((item, index) => (
                        <div key={`Btn${index}`} className={isActiveSort === index ? s.active : null}
                             onClick={() => onSortButton(index)}>{item}</div>
                    ))}
                </div>
                <div className={s.sortingRight} ref={sortRef}>
                    <div className={s.menu} onClick={toggleSubMenu}>
                        <img src='./img/arrowTop.svg' alt="arrow"/>
                        <p>Сортировка по:</p>
                        <p><span>{subMenu[isActiveSubMenu].name}</span></p>
                    </div>
                    {isSubMenu ? <div className={s.subMenu}>
                        <div className={s.features}>
                            {subMenu.map((item, index) => (
                                <p onClick={() => onActiveSubMenu(index)} key={'subMenuItem' + index}
                                   className={isActiveSubMenu == index ? s.activeSubItem : null}>{item.name}</p>
                            ))}
                        </div>
                    </div> : null}
                </div>
            </div>
            <div className={s.pizzasTitle}>Все пиццы</div>
            <div className={s.pizzas}>
                {pizzas.map((item, index) => (
                    <Pizza
                        key={`${item.name}${index}`}
                        parentId={item.parentId}
                        name={item.name}
                        price={item.price}
                        imageUrl={item.imageUrl}
                        types={item.types}
                        sizes={item.sizes}
                    />
                ))}
            </div>
        </div>
    )
}


export default Main;