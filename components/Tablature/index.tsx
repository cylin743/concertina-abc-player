import { useEffect, useState } from "react"
import { getScaleAfterKeyConvert, scalePushMapping, scalePullMapping, scalePushList, scalePullList } from "./setting"


function Tablature(props:{ input: {
    def: string,
    scales?: Array<string>,
    tabs?: Array<string>,

}, style?: any }) {
    var size = "25px"
    var width = "300px"
    var border = "0px"
    if(props.style){
        if(props.style.size){
            size = props.style.size
        }
        if(props.style.width){
            width = props.style.width
        }
        if(props.style.border){
            border = props.style.border
        }
    }
    const leftFirstStyle = {
        marginLeft: "15px",
    }
    const leftSecStyle = {
        marginLeft: "10px",
    }
    const leftThirStyle = {
    }
    const rightFirstStyle = {
    }
    const rightSecStyle = {
        marginLeft: "10px",
    }
    const rightThirStyle = {
        marginLeft: "20px",
    }
    const tablatureConcertina = {
        margin: "5px",
        display: "flex",
        FlexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: width,
        border:border
    }
    const [tab, setTab] = useState({
        l1a: "#aaa",
        l2a: "#aaa",
        l3a: "#aaa",
        l4a: "#aaa",
        l5a: "#aaa",
        l1: "#aaa",
        l2: "#aaa",
        l3: "#aaa",
        l4: "#aaa",
        l5: "#aaa",
        l6: "#aaa",
        l7: "#aaa",
        l8: "#aaa",
        l9: "#aaa",
        l10: "#aaa",
        r1a: "#aaa",
        r2a: "#aaa",
        r3a: "#aaa",
        r4a: "#aaa",
        r5a: "#aaa",
        r1: "#aaa",
        r2: "#aaa",
        r3: "#aaa",
        r4: "#aaa",
        r5: "#aaa",
        r6: "#aaa",
        r7: "#aaa",
        r8: "#aaa",
        r9: "#aaa",
        r10: "#aaa",
    })
    useEffect(()=>{
        var temp:any = {
            l1a: "#aaa",
            l2a: "#aaa",
            l3a: "#aaa",
            l4a: "#aaa",
            l5a: "#aaa",
            l1: "#aaa",
            l2: "#aaa",
            l3: "#aaa",
            l4: "#aaa",
            l5: "#aaa",
            l6: "#aaa",
            l7: "#aaa",
            l8: "#aaa",
            l9: "#aaa",
            l10: "#aaa",
            r1a: "#aaa",
            r2a: "#aaa",
            r3a: "#aaa",
            r4a: "#aaa",
            r5a: "#aaa",
            r1: "#aaa",
            r2: "#aaa",
            r3: "#aaa",
            r4: "#aaa",
            r5: "#aaa",
            r6: "#aaa",
            r7: "#aaa",
            r8: "#aaa",
            r9: "#aaa",
            r10: "#aaa",
        }
        if(props.input.scales){
            for(var i = 0; i < props.input.scales.length; i++){
                var scale:string = props.input.scales[i]
                if(props.input.def == "push"){
                    var k:string = scalePushMapping[scale]
                    temp[k] = "red"
                }else{
                    const k = scalePullMapping[scale]
                    temp[k] = "blue"
                }
            } 
        }
        if(props.input.tabs){
            for(var i = 0; i < props.input.tabs.length; i++){
                var k:string = props.input.tabs[i]
                if(props.input.def == "push"){
                    temp[k] = "red"
                }else{
                    temp[k] = "blue"
                }
            } 
        }
        if(!props.input.tabs && !props.input.scales){
            temp = {
                l1a: "#aaa",
                l2a: "#aaa",
                l3a: "#aaa",
                l4a: "#aaa",
                l5a: "#aaa",
                l1: "#aaa",
                l2: "#aaa",
                l3: "#aaa",
                l4: "#aaa",
                l5: "#aaa",
                l6: "#aaa",
                l7: "#aaa",
                l8: "#aaa",
                l9: "#aaa",
                l10: "#aaa",
                r1a: "#aaa",
                r2a: "#aaa",
                r3a: "#aaa",
                r4a: "#aaa",
                r5a: "#aaa",
                r1: "#aaa",
                r2: "#aaa",
                r3: "#aaa",
                r4: "#aaa",
                r5: "#aaa",
                r6: "#aaa",
                r7: "#aaa",
                r8: "#aaa",
                r9: "#aaa",
                r10: "#aaa",
            }
        }
        setTab(temp)
    },[props])
    
    

    return (
        <div style={mainTablature}>
            <div style={tablatureConcertina}>
                <div id="left">
                    <div style={leftFirstStyle}>
                        <span className="dot" style={{height:size,width:size,backgroundColor: tab.l1a}}/>
                        <span className="dot" style={{height:size,width:size,backgroundColor: tab.l2a}}/>
                        <span className="dot" style={{height:size,width:size,backgroundColor: tab.l3a}}/>
                        <span className="dot" style={{height:size,width:size,backgroundColor: tab.l4a}}/>
                        <span className="dot" style={{height:size,width:size,backgroundColor: tab.l5a}}/>
                    </div>
                    <div style={leftSecStyle}>
                        <span className="dot" style={{height:size,width:size,backgroundColor: tab.l1}}/>
                        <span className="dot" style={{height:size,width:size,backgroundColor: tab.l2}}/>
                        <span className="dot" style={{height:size,width:size,backgroundColor: tab.l3}}/>
                        <span className="dot" style={{height:size,width:size,backgroundColor: tab.l4}}/>
                        <span className="dot" style={{height:size,width:size,backgroundColor: tab.l5}}/>
                    </div>
                    <div style={leftThirStyle}>
                        <span className="dot" style={{height:size,width:size,backgroundColor: tab.l6}}/>
                        <span className="dot" style={{height:size,width:size,backgroundColor: tab.l7}}/>
                        <span className="dot" style={{height:size,width:size,backgroundColor: tab.l8}}/>
                        <span className="dot" style={{height:size,width:size,backgroundColor: tab.l9}}/>
                        <span className="dot" style={{height:size,width:size,backgroundColor: tab.l10}}/>
                    </div>
                </div>
                <div id="right">
                    <div style={rightFirstStyle}>
                        <span className="dot" style={{height:size,width:size,backgroundColor: tab.r1a}}/>
                        <span className="dot" style={{height:size,width:size,backgroundColor: tab.r2a}}/>
                        <span className="dot" style={{height:size,width:size,backgroundColor: tab.r3a}}/>
                        <span className="dot" style={{height:size,width:size,backgroundColor: tab.r4a}}/>
                        <span className="dot" style={{height:size,width:size,backgroundColor: tab.r5a}}/>
                    </div>
                    <div style={rightSecStyle}>
                        <span className="dot" style={{height:size,width:size,backgroundColor: tab.r1}}/>
                        <span className="dot" style={{height:size,width:size,backgroundColor: tab.r2}}/>
                        <span className="dot" style={{height:size,width:size,backgroundColor: tab.r3}}/>
                        <span className="dot" style={{height:size,width:size,backgroundColor: tab.r4}}/>
                        <span className="dot" style={{height:size,width:size,backgroundColor: tab.r5}}/>
                    </div>
                    <div style={rightThirStyle}>
                        <span className="dot" style={{height:size,width:size,backgroundColor: tab.r6}}/>
                        <span className="dot" style={{height:size,width:size,backgroundColor: tab.r7}}/>
                        <span className="dot" style={{height:size,width:size,backgroundColor: tab.r8}}/>
                        <span className="dot" style={{height:size,width:size,backgroundColor: tab.r9}}/>
                        <span className="dot" style={{height:size,width:size,backgroundColor: tab.r10}}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export {Tablature, getScaleAfterKeyConvert, scalePushMapping, scalePullMapping, scalePushList, scalePullList}

const defaultStyle = {
    tablatureConcertina : {
        margin: "5px",
        display: "flex",
        FlexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "300px",
    },
    rowHight: "28px",
    padding: "5px"

}

 
const mainTablature = {
    display: "flex",
    FlexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
}



//   #tablature-concertina #left #first {
//     margin-left:10px;
//   }
//   #tablature-concertina #left #second {
//     margin-left:5px;
//   }
//   #tablature-concertina #right #third {
//     margin-left:10px;
//   }
//   #tablature-concertina #right #second {
//     margin-left:5px;
//   }
//   #tablature-concertina .dot {
//     height: 15px;
//     width: 15px;
//     /* background-color: #bbb; */
//     border-radius: 50%;
//     display: inline-block;
//   }