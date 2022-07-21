import React from 'react';
import { Link } from 'react-router-dom';

function BorderList(props) {
    const name=sessionStorage.getItem("user");
    const userId=sessionStorage.getItem('id');
    let button;
    if(userId===props.userId){
        button= <input type='button' onClick={()=>props.deletTest(props.ids)} value="삭제"/>
    }

    return (
    
                        <tr key={props.ids} >
                            <td className="qa_anser">
                                <Link to={`/main/${props.ids}`}>
                                {props.index}
                                </Link>
                                 </td>
                            <td className="qa_anser">{props.name}</td>
                            <td className="qa_anser">{props.title}
                                {button}
                            </td>
                        </tr>
    );
}

export default BorderList;