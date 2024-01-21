import React from 'react';
import mushroomImage from '../picture/Orange_Mushroom.png'; // 이미지 불러오기
import backgroundImage from '../picture/Lecheln.jfif'; // 백그라운드 이미지 불러오기

function Main() {
    return (
        <div className="search">
            <div className="title">
                <img src={mushroomImage} alt="Orange Mushroom" />
                <h1 className="Maplestory Bold">MAPLE.GG</h1>
            </div>
            <div className="search">
                <input type="text" placeholder="캐릭터 또는 길드명을 입력하세요." />
                <img src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png" alt="Search" />
            </div>
        </div>
    );
}

// function Main() {
//     const [search, setSearch] = useState('');
//     const [characters,  setCharacters] = useState([
//         // 가상의 캐릭터 데이터
//         // { nickname: 'Hero' },
//         // { nickname: 'Warrior' },
//         // { nickname: 'Magician' }
//     ]);

//     const onChange = (e) => {
//         setSearch(e.target.value);
//     };

//     const filterCharacters = characters.filter((character) => {
//         return character.nickname.toLowerCase().includes(search.toLowerCase());
//     });

//     return (
//         <div className="search">
//             <h1 className="title Maplestory Bold">
//                 <img src="ProntEnd-Study/my-toy-project/src/picture/Orange_Mushroom.png" />
//                 maple.GG
//             </h1>
//             <input type="text" value={search} onChange={onChange} placeholder="캐릭터 또는 길드명을 입력하세요."/>
//             <img src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png" />
//             {filterCharacters.map((character, index) => (
//                 <p key={index}>{character.nickname}</p>
//             ))}
//         </div>
//     );
// }

export default Main;
