var a_flosers= ""
var carMat;
var option = {

    follow:true,
    currentCar: 'fordM',

}
recTangl= function(f,shads){
    return view.material({
        color: f,
        metalness:1,
        roughness:1,
        opacity:1,
        depthWrite: true,
        premultipliedAlpha:true,
        //side: THREE.DoubleSide,
    })
}
transpar= function(){
    return view.material({
        color: 0x000000,
        metalness:1,
        roughness:1,
        transparent: true,
        opacity:0,
        premultipliedAlpha:true,
        //side: THREE.DoubleSide,
    })
}
pawn_material= function(f){
    return view.material({
        color: f,
        roughness: 0.4,
        metalness: 0.5
    })
}
addPawn= function(nm, color, posiTion){
    physic.add( {
        shape: view.getGeometry( 'chess','pawn_shape' ),//geometry( o.type + '_shape'),
        geometry: view.getGeometry( 'chess', 'pawn', true ),
        name: nm, 
        material: pawn_material(color),
        type: 'convex', 
        size: [ 0.2 ], 
        geoScale: [ 0.2 ], 
        pos: posiTion, 
        rot: [0,0,0],
        mass:  10, 
        friction: 1,
        rolling:0.9,
        angular:0.5,
        margin:0.03
    } ); 
}
var CARS = [
    { n:'001', name:'fordM'  , radius:0.36, nw:4, w:'1', mass:1109,  wPos:[0.76, 0, 1.46] },
    { n:'002', name:'vaz'    , radius:0.36, nw:4, w:'1', mass:1003,  wPos:[0.72, 0, 1.31] },
    { n:'003', name:'coupe'  , radius:0.36, nw:4, w:'1', mass:900,   wPos:[0.96, 0, 1.49] },
    { n:'005', name:'ben'    , radius:0.40, nw:4, w:'2', mass:1256,  wPos:[0.88, 0, 1.58] },
];
function vehicle ( id, pos, shapeType ) {

    var o = CARS[id];
    o.type = 'car';
    o.shapeType = shapeType || 'box';
    
    o.pos = pos || [0,0,0];
    o.rot = [0,-90,0];

    var shape = view.getGeometry( 'cars', 'shape'+o.n );
    var chassis = view.getGeometry( 'cars', 'mcar'+o.n );
    var down = view.getGeometry( 'cars', 'down'+o.n );
    var inside = view.getGeometry( 'cars', 'inside'+o.n );
    var yy = shape.boundingBox.min.y;

    o.material = carMat;

    if( inside ) o.geometry = view.mergeGeometry([chassis, down, inside]);
    else o.geometry = view.mergeGeometry([chassis, down]);

    o.wheelMaterial = carMat;//view.getMat().cars;

    // The maximum length of the suspension (metres)
    o.s_length = 0.1;//o.radius;// * 0.5;
    //The maximum distance the suspension can be compressed in Cm 
    //o.s_travel = (o.radius*2)*100;
    o.mass = o.mass / 5;
    // Maximum suspension force
    o.s_force = o.mass*10;


    o.s_compression = 0.84;
    o.s_damping = 0.88;
    o.s_stiffness = 40;

    o.wPos[1] = o.radius;//*2;
    
    o.shape = shape;
    //o.mesh = mesh;
    o.wheel = view.getGeometry( 'cars', 'w00' + o.w );
    o.nWheel = o.nw;

    //o.name = 'car_'+ id;

    o.helper = false;

    return o;

};
var recTangle_info= [
    {pic: "https://i.huffpost.com/gen/1693767/images/o-BURNING-MONEY-facebook.jpg", title: "Cabos sueltos", description: "Una forma muy costosa (200) de perder tu turno (vuelves a donde estabas antes).", price: 200, funcTion: function(){
        chaR(activeChar).posiTion= chaR(activeChar).previys_posiTion
    }},
    {pic: "https://i.pinimg.com/originals/84/b7/c7/84b7c7fb7d548d5e65f271c5a70b0d00.jpg", title: "Desterrado", description: "Te van a desterrar por dos turnos a menos de que pagues.", price: 23, funcTion: function(){

    }, re_fusTion: function(){
        chaR(activeChar).skip= 2
        physic.matrix( [ { name:CARS[activeChar].name, pos: [ -63, 2, -68], noVelocity:true } ] )
    }},
    {pic: "http://canadajournal.net/wp-content/uploads/2014/12/Lost-Luggage-Found-20-Years-Later-Video.jpg", title: "Where're my bags?", description: "Recuberarás tus maletas.", price: 82, funcTion: function(){
        for(var i= 2 + parseInt(Math.random()* 19); i; i--){
            physic.add({type:'box', group:1, size:[0.3 + Math.random()*0.2,0.9 + Math.random()*0.9,1.2* Math.random()*1.1], pos:[27.5,3,-42.5 - Math.random()*7], rot:[Math.random()*180,Math.random()*180,Math.random()*180], mass: Math.random() * 2,material: recTangl([0x794e4e, 0x8e6f6f, 0xcea392, 0x625b5b][parseInt(Math.random() * 4)]) });
        }
    }},
    {pic: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F1061%2F1924%2Fproducts%2FAngel_Halo_Emoji_Icon_0ff75c27-5416-4ac6-bf1a-2a2d44b0a32b_grande.png%3Fv%3D1542446807&f=1&nofb=1&ipt=f487639cb89ec13d835512f33e085847741d7530bc21efbbddb86fe26fbfc9d4&ipo=images", title: "A lo que vinimos", description: "Obtendr&aacute;s un alo para tu carro.", price: 20, funcTion: function(){
        alo= new THREE.Mesh( new THREE.TorusGeometry(0.2, 0.025, 16, 32), recTangl(0xe3b661) );
        aloBelow= new THREE.Mesh( new THREE.TorusGeometry(0.2, 0.025, 16, 32), recTangl(0xe3b661) );
        view.getScene().getObjectByName(chaR(activeChar).caR).add(aloBelow)
        view.getScene().getObjectByName(chaR(activeChar).caR).add(alo)
        aloBelow.rotation.x= 90 * Math.PI/180
        alo.rotation.x= -90 * Math.PI/180
        alo.position.y= 2
        aloBelow.position.y= 2
    }},
    {pic: "https://st4.depositphotos.com/18565272/20737/i/450/depositphotos_207379520-stock-photo-colombian-currency-wad-fifty-thousand.jpg", title: "En efectivo", description: "Cambiar&aacute;s 37 denominaciones por efectivo.", price: 37, funcTion: function(){
        for(var i= 37; i; i--){
            physic.add({type:'box', group:1, size:[0.001,0.2,0.1], pos:[17.5,3,-42.5 - Math.random()*7], rot:[Math.random()*180,Math.random()*180,Math.random()*180], mass: 0.001,material: recTangl(0xd9966e), castShadow: false });
        }
    }},
    {pic: "https://img.lagaceta.com.ar/fotos/notas/2022/12/18/tapada-dibu-martinez-fue-clave-para-argentina-se-quede-mundial-qatar-973812-224916.jpg", title: "Flores de colores", description: "Un bal&oacute;n, tres 2; (2022). ..S&oacute;lo un bal&oacute;n. &iexcl;Felicidades a Argentina por ganar la Copa Mundial de la FIFA!", price: 1, funcTion: function(){
        physic.add({ 
            name:'ball', type:'highsphere', mass:1.24, 
            size:[0.2], pos:[12.5,4,-45.5], 
            friction: 0.5, restitution:0.6, 
            material: mat.bball 
        });
        var material= function(c){return new THREE.MeshBasicMaterial( {color: c} )};

        var cone= function(c){
            one= new THREE.Mesh( new THREE.ConeGeometry( 0.10025, 0.20050, 12 ), material(c) )
            one.position.y=0.55
            one.rotation.x= 180 * Math.PI/180
            return one
        };
        var heXaii= function(){
          return (function (fn) {
            return new Function('return ' + fn)();
          })(`0x${heXai()}`)
        }

        heXa= ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"]
        function heXai(){
            let reTurn= ""

            while(reTurn.length<6){
            reTurn= reTurn + heXa[parseInt(Math.random() * heXa.length)]
            }

            return reTurn
        }

        a_flosers= heXai() + 39;
        for(a_flosers= a_flosers; parseInt(a_flosers.slice(6));a_flosers= a_flosers.slice(0, 6) + (parseInt(a_flosers.slice(6)) - 1)){
            physic.add ({ type:'box', name: `floser${a_flosers}`, pos:[view.getScene().getObjectByName(CARS[activeChar].name).position.x,view.getScene().getObjectByName(CARS[activeChar].name).position.y + 3,-42.5 - Math.random()*7], rot:[Math.random()*359,Math.random()*359,Math.random()*390], size:[0.03, 1.1, 0.03], mass:0.002,material:recTangl(0xcc8d57) } );
            view.getScene().getObjectByName(`floser${a_flosers}`).add(cone(heXaii()))
        }
        /*physic.add ({ type:'box', name: "flower", pos:[view.getScene().getObjectByName(CARS[activeChar].name).position.x,view.getScene().getObjectByName(CARS[activeChar].name).position.y + 3,-42.5 - Math.random()*7], rot:[Math.random()*359,Math.random()*359,Math.random()*390], size:[0.03, 1.1, 0.03], mass:0.002,material:recTangl(0xcc8d57) } );
        view.getScene().getObjectByName("flower").add(cone(0xff223d))*/
    }},
    {pic: "https://www.wikihow.com/images/thumb/0/00/Win-Playing-UNO-Step-7-Version-2.jpg/aid320316-v4-728px-Win-Playing-UNO-Step-7-Version-2.jpg", title: "&iexcl;UNO&reg;!", description: "&iexcl;Solo te queda una carta!, &iexcl;ganaste en UNO&reg;!", price: 100, funcTion: function(){
        heXa= ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"]
        function heXai(){
            let reTurn= ""

            while(reTurn.length<6){
            reTurn= reTurn + heXa[parseInt(Math.random() * heXa.length)]
            }

            return reTurn
        }
        c_name= `C_${heXai()}`
        physic.add({type:'box', name: c_name, group:1, size:[0.001,0.2,0.1], pos:[view.getScene().getObjectByName(CARS[activeChar].name).position.x + Math.sin(view.getScene().getObjectByName(CARS[activeChar].name).rotation._y) * 3, view.getScene().getObjectByName(CARS[activeChar].name).position.y + 3,view.getScene().getObjectByName(CARS[activeChar].name).position.z + Math.cos(view.getScene().getObjectByName(CARS[activeChar].name).rotation._y) * 3], rot:[Math.random()*180,Math.random()*180,Math.random()*180], mass: 0.001,material: recTangl(0xff0000), castShadow: false });
        cube = new THREE.Mesh(  new THREE.BoxGeometry( 0.002,0.154709997,0.053777997 ), new THREE.MeshBasicMaterial( {color: 0xffffff} ) );
        view.getScene().getObjectByName(c_name).add(cube)
    }},
    {pic: "https://lirilc.github.io/resources/images/white.jpg", title: "&iexcl;liril es para estudiar!", description: "liril te regala un cuaderno y dos l&aacute;pices (ning&uacute;n sacapuntas). ..Una mesa.", price: 10, funcTion: function(){
        heXa= ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"]
        
        var s = (6*0.5) - 0.3; 
        physic.add({
            type:'compound',
            mass:312,
            pos:[view.getScene().getObjectByName(CARS[activeChar].name).position.x + Math.sin(view.getScene().getObjectByName(CARS[activeChar].name).rotation._y) * 5, view.getScene().getObjectByName(CARS[activeChar].name).position.y + 3,view.getScene().getObjectByName(CARS[activeChar].name).position.z + Math.cos(view.getScene().getObjectByName(CARS[activeChar].name).rotation._y) * 5],
            shapes:(function(o){var tableShape = [
                        { type:'box', pos:[0,0,0], size:[ o*6,o*0.5,o*6 ] },
                        { type:'box', pos:[o*s,o*-2.25,o*s], size:[ o*0.6,o*4,o*0.6 ] },
                        { type:'box', pos:[o*-s,o*-2.25,o*s], size:[ o*0.6,o*4,o*0.6 ] },
                        { type:'box', pos:[o*s,o*-2.25,-o*s], size:[ o*0.6,o*4,o*0.6 ] },
                        { type:'box', pos:[o*-s,o*-2.25,-o*s], size:[ o*0.6,o*4,o*0.6 ] },
                    ]

                return tableShape})(0.3),
            friction:0.5, 
            rot:[0,Math.random()*180,0],
            restitution:0.5,
            material:recTangl(0x8a6e55)
        })
        physic.add({
            type:'compound',
            mass:51,
            pos:[view.getScene().getObjectByName(CARS[activeChar].name).position.x + Math.sin(view.getScene().getObjectByName(CARS[activeChar].name).rotation._y) * 4.1, view.getScene().getObjectByName(CARS[activeChar].name).position.y + 5,view.getScene().getObjectByName(CARS[activeChar].name).position.z + Math.cos(view.getScene().getObjectByName(CARS[activeChar].name).rotation._y) * 4.1],
            shapes:(function(O){var notebookShape = [
                        { type:'box', pos:[O*0,O*0,O*0], size:[ O*0.01,O*3.7,O*2 ] },
                        { type:'box', pos:[O*-0.03,O*0,O*0], size:[ O*0.01,O*3.7,O*2 ] },
                        { type:'box', pos:[O*0.06,O*0,O*0], size:[ O*0.01,O*3.7,O*2 ] },
                        { type:'box', pos:[O*0.09,O*0,O*0], size:[ O*0.01,O*3.7,O*2 ] },
                        { type:'box', pos:[O*0.12,O*0,O*0], size:[ O*0.01,O*3.7,O*2 ] },
                        { type:'box', pos:[O*0.15,O*0,O*0], size:[ O*0.01,O*3.7,O*2 ] },
                        { type:'box', pos:[O*0.18,O*0,O*0], size:[ O*0.01,O*3.7,O*2 ] },
                        { type:'box', pos:[O*0.21,O*0,O*0], size:[ O*0.01,O*3.7,O*2 ] },
                        { type:'box', pos:[O*0.24,O*0,O*0], size:[ O*0.01,O*3.7,O*2 ] },
                        { type:'box', pos:[O*-0.06,O*0,O*0], size:[ O*0.01,O*3.7,O*2 ] },
                        { type:'box', pos:[O*-0.09,O*0,O*0], size:[ O*0.01,O*3.7,O*2 ] },
                        { type:'box', pos:[O*-0.12,O*0,O*0], size:[ O*0.01,O*3.7,O*2 ] },
                        { type:'box', pos:[O*-0.15,O*0,O*0], size:[ O*0.01,O*3.7,O*2 ] },
                        { type:'box', pos:[O*-0.18,O*0,O*0], size:[ O*0.01,O*3.7,O*2 ] },
                        { type:'box', pos:[O*-0.21,O*0,O*0], size:[ O*0.01,O*3.7,O*2 ] },
                        { type:'box', pos:[O*-0.24,O*0,O*0], size:[ O*0.01,O*3.7,O*2 ] },
{ type:'box', pos:[O*0,O*0,O*-0.8], size:[ O*-0.79,O*3.7,O*0.4 ] }
                   ]

                return notebookShape})(0.17),
            friction:0.5, 
            rot:[Math.random()*180,Math.random()*180,Math.random()*180],
            restitution:0.5,
            material:recTangl(0xf29fff)
        })

        var O=10.817
        physic.add({
            type:'cylinder',
            mass:0.00002,
            pos:[view.getScene().getObjectByName(CARS[activeChar].name).position.x + Math.sin(view.getScene().getObjectByName(CARS[activeChar].name).rotation._y) * 3, view.getScene().getObjectByName(CARS[activeChar].name).position.y + 3.2,view.getScene().getObjectByName(CARS[activeChar].name).position.z + Math.cos(view.getScene().getObjectByName(CARS[activeChar].name).rotation._y) * 3],
            size:[ O*0.02,O*0.002,O*0 ],
            friction:0.5, 
            rot:[Math.random()*180,Math.random()*180,Math.random()*180],
            restitution:0.5,
            material:recTangl(0xf29f23)
        })
        physic.add({
            type:'cylinder',
            mass:0.00002,
            pos:[view.getScene().getObjectByName(CARS[activeChar].name).position.x + Math.sin(view.getScene().getObjectByName(CARS[activeChar].name).rotation._y) * 3, view.getScene().getObjectByName(CARS[activeChar].name).position.y + 3.2,view.getScene().getObjectByName(CARS[activeChar].name).position.z + Math.cos(view.getScene().getObjectByName(CARS[activeChar].name).rotation._y) * 3],
            size:[ O*0.02,O*0.002,O*0 ],
            friction:0.5, 
            rot:[Math.random()*180,Math.random()*180,Math.random()*180],
            restitution:0.5,
            material:recTangl(0xf29f23)
        })
    }},
    {pic: "https://www.elimparcial.es/galerias-noticias/galerias/115918/medium/tabac_d.jpg", title: "Algunos cigarrillos", description: "39 cigarrillos", price: 31, funcTion: function(){
        heXa= ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"]
        var heXai= function(){
            let reTurn= ""

            while(reTurn.length<6){
            reTurn= reTurn + heXa[parseInt(Math.random() * heXa.length)]
            }

            return reTurn
        }
        var filter= function(c){
            var O=1
            one= new THREE.Mesh( new THREE.CylinderGeometry( O*0.01,O*0.01, 0.067, 32 ), c )
            one.position.x=0.13
            one.rotation.z= 90 * Math.PI/180
            return one
        };
        for(var w= 39; w;w--){
            var c_name='C_'+  heXai();
            (function(O){physic.add({
                type:'cylinder',
                name: c_name,
                mass:0.0000000012562,
                pos:[-22.5,(3+2*Math.random()),(-42.5 - Math.random()*7)],
                size:[ O*0.16,O*0.008,O*0 ],
                friction:0.5, 
                rot:[Math.random()*180,Math.random()*180,Math.random()*180],
                restitution:0.5,
                material:recTangl(0xffffff)
            })})(1)
            view.getScene().getObjectByName(c_name).add(filter(recTangl(0xfd7028)))
        }
    }, re_fusTion: function(){
        heXa= ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"]
        var heXai= function(){
            let reTurn= ""

            while(reTurn.length<6){
            reTurn= reTurn + heXa[parseInt(Math.random() * heXa.length)]
            }

            return reTurn
        }
        var filter= function(c){
            var O=1
            one= new THREE.Mesh( new THREE.CylinderGeometry( O*0.002,O*0.01, 0.057, 32 ), c )
            one.position.x=0.13
            one.rotation.z= 90 * Math.PI/180
            return one
        };
        for(var w= 6; w;w--){
            var c_name='C_'+  heXai();
            (function(O){physic.add({
                type:'cylinder',
                name: c_name,
                mass:0.0000000012562,
                pos:[-22.5,(3+2*Math.random()),(-42.5 - Math.random()*7)],
                size:[ O*0.16,O*0.008,O*0 ],
                friction:0.5, 
                rot:[Math.random()*180,Math.random()*180,Math.random()*180],
                restitution:0.5,
                material:recTangl(0xffffff)
            })})(1)
            view.getScene().getObjectByName(c_name).add(filter(recTangl(0xf7f500)))
        }
    }},
    {pic: "https://stoneyroads.com/wp-content/uploads/2019/02/house-party-large.jpg", title: "&iexcl;Fiesta para 11!", description: "Festeja responsablemente.", price: 11, funcTion: function(){
        heXa= ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"]
        var heXai= function(){
            let reTurn= ""

            while(reTurn.length<6){
            reTurn= reTurn + heXa[parseInt(Math.random() * heXa.length)]
            }

            return reTurn
        }
        function ragdoll (id, x, y, z) {
            id= "ragdoll_" + heXai()
            var mass = 0.2;
            var collision = true;
            var rIn= (parseInt(Math.random()*5)-2)
            var p = {x:view.getScene().getObjectByName(CARS[activeChar].name).position.x + Math.sin(view.getScene().getObjectByName(CARS[activeChar].name).rotation._y) * rIn, y: view.getScene().getObjectByName(CARS[activeChar].name).position.y + (1.5+Math.random()*3.2), z:view.getScene().getObjectByName(CARS[activeChar].name).position.z + Math.cos(view.getScene().getObjectByName(CARS[activeChar].name).rotation._y) * rIn};
            var spring = [2, 0.3, 0.1]; // softness, bias, relaxation
            var type = 'box';

            // joint is default joint_hinge
            // joint can be :
            // joint_hinge, joint_p2p, joint_slider, joint_conetwist, joint_dof, joint_spring_dof

            // body

            physic.addGroup([

                { type:type, size:[0.2,0.1,0.15], pos:[p.x,p.y-0.2,p.z], mass:mass,  name:'pelvis'+id },
                { type:type, size:[0.2,0.1,0.15], pos:[p.x,p.y-0.1,p.z], mass:mass,  name:'spine1_'+id },
                { type:type, size:[0.2,0.1,0.15], pos:[p.x,p.y,p.z], mass:mass, name:'spine2_'+id, noSleep:true },
                { type:type, size:[0.2,0.1,0.15], pos:[p.x,p.y+0.1,p.z], mass:mass,  name:'spine3_'+id },
                { type:"sphere", size:[0.1,0.1,0.1], pos:[p.x,p.y+0.3,p.z], mass:mass,  name:'head'+id },

                { type:"joint", b1:'pelvis'+id, b2:'spine1_'+id, pos1:[0,0.05,0], pos2:[0,-0.05,0], limit:[2,20].concat(spring), collision:collision },
                { type:"joint", b1:'spine1_'+id, b2:'spine2_'+id, pos1:[0,0.05,0], pos2:[0,-0.05,0], limit:[2,20].concat(spring), collision:collision },
                { type:"joint", b1:'spine2_'+id, b2:'spine3_'+id, pos1:[0,0.05,0], pos2:[0,-0.05,0], limit:[2,20].concat(spring), collision:collision },
                { type:"joint", b1:'spine3_'+id, b2:'head'+id,  pos1:[0,0.05,0], pos2:[0,-0.1,0], limit:[2,20].concat(spring), collision:collision },

                //arm

                { type:type, size:[0.2,0.1,0.1], pos:[p.x-0.2,p.y+0.08,p.z], rot:[0,0,20], mass:mass,  name:'L_arm'+id },
                { type:type, size:[0.2,0.08,0.08], pos:[p.x-0.4,p.y,p.z], rot:[0,0,20], mass:mass,  name:'LF_arm'+id },

                { type:type, size:[0.2,0.1,0.1], pos:[p.x+0.2,p.y+0.08,p.z], rot:[0,0,-20], mass:mass,  name:'R_arm'+id },
                { type:type, size:[0.2,0.08,0.08], pos:[p.x+0.4,p.y,p.z], rot:[0,0,-20], mass:mass,  name:'RF_arm'+id },

                { type:"joint", b1:'spine3_'+id, b2:'L_arm'+id, pos1:[-0.1,0,0], pos2:[0.1,0,0], axe1:[0,1,1], axe2:[0,1,1], collision:collision },
                { type:"joint", b1:'spine3_'+id, b2:'R_arm'+id, pos1:[0.1,0,0], pos2:[-0.1,0,0], axe1:[0,1,1], axe2:[0,1,1], collision:collision },

                { type:"joint", b1:'L_arm'+id, b2:'LF_arm'+id, pos1:[-0.1,0,0], pos2:[0.1,0,0], axe1:[0,1,0], axe2:[0,1,0], collision:collision },
                { type:"joint", b1:'R_arm'+id, b2:'RF_arm'+id, pos1:[0.1,0,0], pos2:[-0.1,0,0], axe1:[0,1,0], axe2:[0,1,0], collision:collision },

                // leg

                { type:type, size:[0.1,0.2,0.1], pos:[p.x-0.06,p.y-0.4,p.z], rot:[0,0,-20], mass:mass, name:'L_leg'+id },
                { type:type, size:[0.08,0.2,0.08], pos:[p.x-0.15,p.y-0.7,p.z], rot:[0,0,-20], mass:mass, name:'LF_leg'+id },

                { type:type, size:[0.1,0.2,0.1], pos:[p.x+0.06,p.y-0.4,p.z], rot:[0,0,20], mass:mass, name:'R_leg'+id },
                { type:type, size:[0.08,0.2,0.08], pos:[p.x+0.15,p.y-0.7,p.z], rot:[0,0,20], mass:mass, name:'RF_leg'+id },

                { type:"joint", b1:'pelvis'+id, b2:'L_leg'+id, pos1:[-0.06,-0.05,0], pos2:[0,0.1,0], limit:[2,60], collision:collision },
                { type:"joint", b1:'pelvis'+id, b2:'R_leg'+id, pos1:[0.06,-0.05,0], pos2:[0,0.1,0], limit:[2,60], collision:collision },

                { type:"joint", b1:'L_leg'+id, b2:'LF_leg'+id, pos1:[0,-0.1,0], pos2:[0,0.1,0], axe1:[1,0,0], axe2:[1,0,0], limit:[2,60], collision:collision },
                { type:"joint", b1:'R_leg'+id, b2:'RF_leg'+id, pos1:[0,-0.1,0], pos2:[0,0.1,0], axe1:[1,0,0], axe2:[1,0,0], limit:[2,60], collision:collision },

            ]);

        };
        for(var i = 0; i<10; i++){
            ragdoll(i, 0, 2+((1.5+(Math.random()*3.5))*i), 0, 2 );
        }
    }, re_fusTion: function(){
        heXa= ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"]
        var heXai= function(){
            let reTurn= ""

            while(reTurn.length<6){
            reTurn= reTurn + heXa[parseInt(Math.random() * heXa.length)]
            }

            return reTurn
        }
        function ragdoll (id, x, y, z) {
            id= "ragdoll_" + heXai()
            var mass = 0.2;
            var collision = true;
            var rIn= (parseInt(Math.random()*5)-2)
            var p = {x:view.getScene().getObjectByName(CARS[activeChar].name).position.x + Math.sin(view.getScene().getObjectByName(CARS[activeChar].name).rotation._y) * rIn, y: view.getScene().getObjectByName(CARS[activeChar].name).position.y + (1.5+Math.random()*3.2), z:view.getScene().getObjectByName(CARS[activeChar].name).position.z + Math.cos(view.getScene().getObjectByName(CARS[activeChar].name).rotation._y) * rIn};
            var spring = [2, 0.3, 0.1]; // softness, bias, relaxation
            var type = 'box';

            // joint is default joint_hinge
            // joint can be :
            // joint_hinge, joint_p2p, joint_slider, joint_conetwist, joint_dof, joint_spring_dof

            // body

            physic.addGroup([

                { type:type, size:[0.2,0.1,0.15], pos:[p.x,p.y-0.2,p.z], mass:mass,  name:'pelvis'+id },
                { type:type, size:[0.2,0.1,0.15], pos:[p.x,p.y-0.1,p.z], mass:mass,  name:'spine1_'+id },
                { type:type, size:[0.2,0.1,0.15], pos:[p.x,p.y,p.z], mass:mass, name:'spine2_'+id, noSleep:true },
                { type:type, size:[0.2,0.1,0.15], pos:[p.x,p.y+0.1,p.z], mass:mass,  name:'spine3_'+id },
                { type:"sphere", size:[0.1,0.1,0.1], pos:[p.x,p.y+0.3,p.z], mass:mass,  name:'head'+id },

                { type:"joint", b1:'pelvis'+id, b2:'spine1_'+id, pos1:[0,0.05,0], pos2:[0,-0.05,0], limit:[2,20].concat(spring), collision:collision },
                { type:"joint", b1:'spine1_'+id, b2:'spine2_'+id, pos1:[0,0.05,0], pos2:[0,-0.05,0], limit:[2,20].concat(spring), collision:collision },
                { type:"joint", b1:'spine2_'+id, b2:'spine3_'+id, pos1:[0,0.05,0], pos2:[0,-0.05,0], limit:[2,20].concat(spring), collision:collision },
                { type:"joint", b1:'spine3_'+id, b2:'head'+id,  pos1:[0,0.05,0], pos2:[0,-0.1,0], limit:[2,20].concat(spring), collision:collision },

                //arm

                { type:type, size:[0.2,0.1,0.1], pos:[p.x-0.2,p.y+0.08,p.z], rot:[0,0,20], mass:mass,  name:'L_arm'+id },
                { type:type, size:[0.2,0.08,0.08], pos:[p.x-0.4,p.y,p.z], rot:[0,0,20], mass:mass,  name:'LF_arm'+id },

                { type:type, size:[0.2,0.1,0.1], pos:[p.x+0.2,p.y+0.08,p.z], rot:[0,0,-20], mass:mass,  name:'R_arm'+id },
                { type:type, size:[0.2,0.08,0.08], pos:[p.x+0.4,p.y,p.z], rot:[0,0,-20], mass:mass,  name:'RF_arm'+id },

                { type:"joint", b1:'spine3_'+id, b2:'L_arm'+id, pos1:[-0.1,0,0], pos2:[0.1,0,0], axe1:[0,1,1], axe2:[0,1,1], collision:collision },
                { type:"joint", b1:'spine3_'+id, b2:'R_arm'+id, pos1:[0.1,0,0], pos2:[-0.1,0,0], axe1:[0,1,1], axe2:[0,1,1], collision:collision },

                { type:"joint", b1:'L_arm'+id, b2:'LF_arm'+id, pos1:[-0.1,0,0], pos2:[0.1,0,0], axe1:[0,1,0], axe2:[0,1,0], collision:collision },
                { type:"joint", b1:'R_arm'+id, b2:'RF_arm'+id, pos1:[0.1,0,0], pos2:[-0.1,0,0], axe1:[0,1,0], axe2:[0,1,0], collision:collision },

                // leg

                { type:type, size:[0.1,0.2,0.1], pos:[p.x-0.06,p.y-0.4,p.z], rot:[0,0,-20], mass:mass, name:'L_leg'+id },
                { type:type, size:[0.08,0.2,0.08], pos:[p.x-0.15,p.y-0.7,p.z], rot:[0,0,-20], mass:mass, name:'LF_leg'+id },

                { type:type, size:[0.1,0.2,0.1], pos:[p.x+0.06,p.y-0.4,p.z], rot:[0,0,20], mass:mass, name:'R_leg'+id },
                { type:type, size:[0.08,0.2,0.08], pos:[p.x+0.15,p.y-0.7,p.z], rot:[0,0,20], mass:mass, name:'RF_leg'+id },

                { type:"joint", b1:'pelvis'+id, b2:'L_leg'+id, pos1:[-0.06,-0.05,0], pos2:[0,0.1,0], limit:[2,60], collision:collision },
                { type:"joint", b1:'pelvis'+id, b2:'R_leg'+id, pos1:[0.06,-0.05,0], pos2:[0,0.1,0], limit:[2,60], collision:collision },

                { type:"joint", b1:'L_leg'+id, b2:'LF_leg'+id, pos1:[0,-0.1,0], pos2:[0,0.1,0], axe1:[1,0,0], axe2:[1,0,0], limit:[2,60], collision:collision },
                { type:"joint", b1:'R_leg'+id, b2:'RF_leg'+id, pos1:[0,-0.1,0], pos2:[0,0.1,0], axe1:[1,0,0], axe2:[1,0,0], limit:[2,60], collision:collision },

            ]);

        };
        var i= 1
        ragdoll(i, 0, 2+((1.5+(Math.random()*3.5))*i), 0, 2 );
    }},
    {pic: "https://images.skyscrapercenter.com/building/edificio-coltejer_laloking972.jpg", title: "Edificios", description: "Tres edificios inclinados.", price: 161, funcTion: function(){
        heXa= ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"]
        var heXai= function(){
            let reTurn= ""

            while(reTurn.length<6){
            reTurn= reTurn + heXa[parseInt(Math.random() * heXa.length)]
            }

            return reTurn
        }
        var heXaii= function(){
          return (function (fn) {
            return new Function('return ' + fn)();
          })(`0x${heXai()}`)
        }
        for(var w= 3; w;w--){
            rBool= (Math.random() < 0.5?true:false)
            physic.add({type:'box', group:1, size:[1 + Math.random()*1.8,(function(){a=Math.random()*12;return a})(),1 + Math.random()*1.8], pos:[rBool?((Math.random()* ((37.5-12.5) + 1) + 12.5) * (Math.random() < 0.5?-1:1)):((-45.5+(Math.random()*6-2.5)) * (Math.random() < 0.5?-1:1)),0,rBool?((-45.5+(Math.random()*6-2.5)) * (Math.random() < 0.5?-1:1)):((Math.random()* ((37.5-12.5) + 1) + 12.5) * (Math.random() < 0.5?-1:1))], rot:[Math.random()*180,Math.random()*180,Math.random()*180], mass: 0,material: recTangl(heXaii())});
        }
    }},
    {pic: "https://static.stihl.com/upload/assetmanager/modell_imagefilename/scaled/zoom/f4d8426ce9c04a61bf176cf0e222f942.jpg", title: "Poda por todos", description: "Paga la cuota comunitaria para podar de las ramas La Tabla.", price: 24, funcTion: function(){
        
    }, re_fusTion: function(){
        for(var w= 10; w;w--){
            physic.add({type:'hardbox', group:1, size:[Math.random()*0.6,(function(){a=Math.random()*11;return a})(),Math.random()*0.6], pos:[-37.5+(Math.random()*6-2.5),a/2,-45.5+(Math.random()*10-4.5)], rot:[Math.random()*180,Math.random()*180,Math.random()*180], mass: 0,material: recTangl(0xd9966e), castShadow: false, breakable:true, breakOption:[ 56, 17,23, 23 ],});
        }
    }},
    {pic: "https://i.pinimg.com/originals/1b/86/c1/1b86c18db72c7dd22f32aa0984137911.jpg", title: "Almohada para medianos", description: "No para gigantes.", price: 58, funcTion: function(){
        physic.add({ 
            type: 'softMesh',
            shape: new THREE.BoxBufferGeometry( 7,2,4, 3,4,3 ),
            material: recTangl(0xf8f8f8),

            pos:[view.getScene().getObjectByName(CARS[activeChar].name).position.x + Math.sin(view.getScene().getObjectByName(CARS[activeChar].name).rotation._y) * 3, view.getScene().getObjectByName(CARS[activeChar].name).position.y + 3,view.getScene().getObjectByName(CARS[activeChar].name).position.z + Math.cos(view.getScene().getObjectByName(CARS[activeChar].name).rotation._y) * 3],
            size:[0.5,0.5,0.5],
            rot:[0,0,0],

            mass:1,
            state:4,

            viterations: 10,
            piterations: 10,
            //citerations:4,
            //diterations:0,

            friction: 0.5,
            damping: 0.01,
            pressure: 170,
            stiffness: 0.6,

            margin:0.05,
            fromfaces:true,
            
        });    
    }, re_fusTion: function(){

    }},
    {pic: "https://www.pdsigns.ie/contentFiles/productImages/Medium/IWSH33.jpg", title: "Para prueba", description: "Prueba la seguridad en los coches ante el vidrio. (--228 denominaciones)", price: -228, funcTion: function(){
        var glass = view.material({
            name:'glass',
            color: 0x3366ff,
            transparent: true,
            roughness:0,
            metalness:1,
            opacity:0.5,
            depthWrite: true,
            //side: THREE.DoubleSide,
        });
    

        for(var i = 0; i < 5; i++ ){
            // breakOption: [ maxImpulse, maxRadial, maxRandom, levelOfSubdivision ]
            physic.add({ 
                type:'hardbox', size:[6, 0.2, 6], pos:[-45.5, view.getScene().getObjectByName(CARS[activeChar].name).position.y + 3+i*3,-32.5], rot:[0,0,0], mass:500, material:glass, 
                breakable:true, breakOption:[ 200, 1, 3, 2 ],
                margin: 0.05,
                //
                //ccdRadius:0.1,
            });
        }
    }, re_fusTion: function(){

    }},
    {pic: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/109976d5-08d6-4457-af11-b3c3baf9944f/d2zbexh-ceabd9e8-00c4-48ec-bc40-d5bc650e31cd.jpg/v1/fill/w_900,h_1015,q_75,strp/hand_of_god_by_afina_energy-d2zbexh.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl0sIm9iaiI6W1t7InBhdGgiOiIvZi8xMDk5NzZkNS0wOGQ2LTQ0NTctYWYxMS1iM2MzYmFmOTk0NGYvZDJ6YmV4aC1jZWFiZDllOC0wMGM0LTQ4ZWMtYmM0MC1kNWJjNjUwZTMxY2QuanBnIiwid2lkdGgiOiI8PTkwMCIsImhlaWdodCI6Ijw9MTAxNSJ9XV19.n1Y2YFJEMxSqNvQq69Sk9Zktt_mTs9lZDfDDl1PKMGs", title: "Hand of God", description: `You will &quot;of God&quot; your hand (the pointer).`, price: 208, funcTion: function(){
        for(a=3; a+1;a--){
            chaR(a).hand= true
        }
        chaR(activeChar).hand= "of_God"
        editor.extraMode== ""?editor.toggleExtraMode( 'picker' ):1
        $("body").css({"cursor":"pointer"})
    }, re_fusTion: function(){

    }}

      

]
function demo () {
    view.moveCam({ theta:-90, phi:40, distance:13, target:[47, 0,-44] });

    physic.set(); // reset default setting


    physic.add({ type:'box', size:[82,2,82], pos:[0,-25,0], rot:[0,0,0], mass:0, group:2, material: recTangl(0x999ddd)});
    physic.add({type:'box', group:1, size:[82,25,1], pos:[0,-12.5,40.5], material: recTangl(0x999ddd) });
    physic.add({type:'box', group:1, size:[82,25,1], pos:[0,-12.5,-40.5], material: recTangl(0x999ddd) });
    physic.add({type:'box', group:1, size:[1,25,82], pos:[-40.5,-12.5, 0], material: recTangl(0x999ddd) });
    physic.add({type:'box', group:1, size:[1,25,82], pos:[40.5,-12.5, 0], material: recTangl(0x999ddd) });

    physic.add({type:'box', group:1, size:[9,5,100], pos:[45.5,-2.5, 0], material: recTangl(0xddd999) });
    physic.add({type:'box', group:1, size:[9,5,100], pos:[-45.5,-2.5, 0], material: recTangl(0xddd999) });
    physic.add({type:'box', group:1, size:[100,5,9], pos:[0,-2.5, -45.5], material: recTangl(0xddd999) });
    physic.add({type:'box', group:1, size:[100,5,9], pos:[0,-2.5, 45.5], material: recTangl(0xddd999) });

    /*physic.add ({ 
        type:'terrain',
        name:'water',

        uv:2,
        water:true,
        pos : [0,-21.342543,0], // terrain position
        size : [80,19,80], // terrain size in meter
        sample : [128,128], // number of subdivision

        frequency : [0.016,0.08], // frequency of noise
        level : [ 2, 0.2 ], // influence of octave
        expo: 0.03,

        deep: 0.2,
        opacity: 0.8,
        border:true,
        bottom:true,


        friction: 1, 
        //bounce: 0.0,
        //soft_cfm:0.000001
        //toTri: true,
        group:2, 
    });

    water = physic.byName('water');*/

    /*physic.add({type:'box', group:1, size:[9,5,100], pos:[40.5,-2.5, 0], material: recTangl(0x9dfddd) });
    physic.add({type:'box', group:1, size:[5,0.1,9], pos:[37.5,0,-45.5], name: "recTangle0", material: recTangl(0xff1212) });*/

    // side wall
    physic.add({type:'box', group:1, size:[100,20,1], pos:[0,10,50.5] });
    physic.add({type:'box', group:1, size:[30,12,1], pos:[25,6,40.5] });
    physic.add({type:'box', group:1, size:[30,12,1], pos:[-25,6,40.5] });
    physic.add({type:'box', group:1, size:[100,20,1], pos:[0,10,-50.5] });
    physic.add({type:'box', group:1, size:[30,12,1], pos:[25,6,-40.5] });
    physic.add({type:'box', group:1, size:[30,12,1], pos:[-25,6,-40.5] });
    physic.add({type:'box', group:1, size:[1,20,100], pos:[50.5,10,0] });
    physic.add({type:'box', group:1, size:[1,12,30], pos:[40.5,6,25] });
    physic.add({type:'box', group:1, size:[1,12,30], pos:[40.5,6,-25] });
    physic.add({type:'box', group:1, size:[1,20,100], pos:[-50.5,10,0] });
    physic.add({type:'box', group:1, size:[1,12,30], pos:[-40.5,6,25] });
    physic.add({type:'box', group:1, size:[1,12,30], pos:[-40.5,6,-25] });
    physic.add({type:'box', group:1, size:[5,0.1,9], pos:[37.5,0,-45.5], name: "recTangle0", material: recTangl(0xff1212) });
    physic.add({type:'box', group:1, size:[5,0.1,9], pos:[32.5,0,-45.5], name: "recTangle1", material: recTangl(0x0f9ba0) });
    physic.add({type:'box', group:1, size:[5,0.1,9], pos:[27.5,0,-45.5], name: "recTangle2", material: recTangl(0x2f2fff) });
    physic.add({type:'box', group:1, size:[5,0.1,9], pos:[22.5,0,-45.5], name: "recTangle3", material: recTangl(0xd7ff8c) });
    physic.add({type:'box', group:1, size:[5,0.1,9], pos:[17.5,0,-45.5], name: "recTangle4", material: recTangl(0xb3c82d) });
    physic.add({type:'box', group:1, size:[5,0.1,9], pos:[12.5,0,-45.5], name: "recTangle5", material: recTangl(0xd99836) });
    physic.add({type:'box', group:1, size:[5,0.1,9], pos:[-12.5,0,-45.5], name: "recTangle6", material: recTangl(0xf2656d) });
    physic.add({type:'box', group:1, size:[5,0.1,9], pos:[-17.5,0,-45.5], name: "recTangle7", material: recTangl(0xffc2fd) });
    physic.add({type:'box', group:1, size:[5,0.1,9], pos:[-22.5,0,-45.5], name: "recTangle8", material: recTangl(0x070707) });
    physic.add({type:'box', group:1, size:[5,0.1,9], pos:[-27.5,0,-45.5], name: "recTangle9", material: recTangl(0x77f717) });
    physic.add({type:'box', group:1, size:[5,0.1,9], pos:[-32.5,0,-45.5], name: "recTangle10", material: recTangl(0xf23467) });
    physic.add({type:'box', group:1, size:[5,0.1,9], pos:[-37.5,0,-45.5], name: "recTangle11", material: recTangl(0x043754) });
    physic.add({type:'box', group:1, size:[9,0.1,5], pos:[-45.5,0,-37.5], name: "recTangle12", material: recTangl(0xbd8311) });
    physic.add({type:'box', group:1, size:[9,0.1,5], pos:[-45.5,0,-32.5], name: "recTangle13", material: recTangl(0xfff234) });
    physic.add({type:'box', group:1, size:[9,0.1,5], pos:[-45.5,0,-27.5], name: "recTangle14", material: recTangl(0x3182cc) });
    physic.add({type:'box', group:1, size:[9,0.1,5], pos:[-45.5,0,-22.5], name: "recTangle15", material: recTangl(0xcff719) });
    physic.add({type:'box', group:1, size:[9,0.1,5], pos:[-45.5,0,-17.5], name: "recTangle16", material: recTangl(0xfc2719) });
    physic.add({type:'box', group:1, size:[9,0.1,5], pos:[-45.5,0,-12.5], name: "recTangle17", material: recTangl(0xc345d9) });
    physic.add({type:'box', group:1, size:[9,0.1,5], pos:[-45.5,0,12.5], name: "recTangle18", material: recTangl(0xbf920d) });
    physic.add({type:'box', group:1, size:[9,0.1,5], pos:[-45.5,0,17.5], name: "recTangle19", material: recTangl(0xbc23d5) });
    physic.add({type:'box', group:1, size:[9,0.1,5], pos:[-45.5,0,22.5], name: "recTangle20", material: recTangl(0xbc01f5) });
    physic.add({type:'box', group:1, size:[9,0.1,5], pos:[-45.5,0,27.5], name: "recTangle21", material: recTangl(0xb34c23) });
    physic.add({type:'box', group:1, size:[9,0.1,5], pos:[-45.5,0,32.5], name: "recTangle22", material: recTangl(0xbd2d8c) });
    physic.add({type:'box', group:1, size:[9,0.1,5], pos:[-45.5,0,37.5], name: "recTangle23", material: recTangl(0xf3246d) });
    physic.add({type:'box', group:1, size:[5,0.1,9], pos:[37.5,0,45.5], name: "recTangle24", material: recTangl(0xd2fccf) });
    physic.add({type:'box', group:1, size:[5,0.1,9], pos:[32.5,0,45.5], name: "recTangle25", material: recTangl(0x3df298) });
    physic.add({type:'box', group:1, size:[5,0.1,9], pos:[27.5,0,45.5], name: "recTangle26", material: recTangl(0xd23fff) });
    physic.add({type:'box', group:1, size:[5,0.1,9], pos:[22.5,0,45.5], name: "recTangle27", material: recTangl(0xdf8928) });
    physic.add({type:'box', group:1, size:[5,0.1,9], pos:[17.5,0,45.5], name: "recTangle28", material: recTangl(0x190213) });
    physic.add({type:'box', group:1, size:[5,0.1,9], pos:[12.5,0,45.5], name: "recTangle29", material: recTangl(0xcc22d1) });
    physic.add({type:'box', group:1, size:[5,0.1,9], pos:[-12.5,0,45.5], name: "recTangle30", material: recTangl(0x10d729) });
    physic.add({type:'box', group:1, size:[5,0.1,9], pos:[-17.5,0,45.5], name: "recTangle31", material: recTangl(0xdb90ff) });
    physic.add({type:'box', group:1, size:[5,0.1,9], pos:[-22.5,0,45.5], name: "recTangle32", material: recTangl(0xbbf837) });
    physic.add({type:'box', group:1, size:[5,0.1,9], pos:[-27.5,0,45.5], name: "recTangle33", material: recTangl(0xfecfec) });
    physic.add({type:'box', group:1, size:[5,0.1,9], pos:[-32.5,0,45.5], name: "recTangle34", material: recTangl(0xc8f972) });
    physic.add({type:'box', group:1, size:[5,0.1,9], pos:[-37.5,0,45.5], name: "recTangle35", material: recTangl(0x04d754) });
    physic.add({type:'box', group:1, size:[9,0.1,5], pos:[45.5,0,37.5], name: "recTangle36", material: recTangl(0xf1a191) });
    physic.add({type:'box', group:1, size:[9,0.1,5], pos:[45.5,0,32.5], name: "recTangle37", material: recTangl(0x201874) });
    physic.add({type:'box', group:1, size:[9,0.1,5], pos:[45.5,0,27.5], name: "recTangle38", material: recTangl(0x869279) });
    physic.add({type:'box', group:1, size:[9,0.1,5], pos:[45.5,0,22.5], name: "recTangle39", material: recTangl(0x109849) });
    physic.add({type:'box', group:1, size:[9,0.1,5], pos:[45.5,0,17.5], name: "recTangle40", material: recTangl(0x957913) });
    physic.add({type:'box', group:1, size:[9,0.1,5], pos:[45.5,0,12.5], name: "recTangle41", material: recTangl(0x392798) });
    physic.add({type:'box', group:1, size:[9,0.1,5], pos:[45.5,0,-12.5], name: "recTangle42", material: recTangl(0x910471) });
    physic.add({type:'box', group:1, size:[9,0.1,5], pos:[45.5,0,-17.5], name: "recTangle43", material: recTangl(0x010473) });
    physic.add({type:'box', group:1, size:[9,0.1,5], pos:[45.5,0,-22.5], name: "recTangle44", material: recTangl(0x975976) });
    physic.add({type:'box', group:1, size:[9,0.1,5], pos:[45.5,0,-27.5], name: "recTangle45", material: recTangl(0x313546) });
    physic.add({type:'box', group:1, size:[9,0.1,5], pos:[45.5,0,-32.5], name: "recTangle46", material: recTangl(0x978274) });
    physic.add({type:'box', group:1, size:[9,0.1,5], pos:[45.5,0,-37.5], name: "recTangle47", material: recTangl(0x397414) });

    
    /*var i, s, x, y, t;
    for( i = 0; i < 20; i++){
        t = Math.randInt(0,1)
        x = Math.rand(-50, 50);
        z = Math.rand(-50, 50);
        s = Math.rand(0.5, 5);
        d = Math.rand(0.5, 5);
        b = Math.rand(0.5, 5);
        physic.add({ type:t===1 ?'box':'sphere', size:t===1?[s,d,b]: [s,s,s], pos:[x,s*0.5,z], mass:s, state:4 });
    }*/

    
    physic.set({
        fps:60,
        numStep:8,// more numStep = more accurate simulation default set to 2
        gravity:[ 0, option.gravity ,0 ],
    })

    view.load ( 'cars.sea', afterLoad, true );

    view.load ( 'chess.sea', afterLoadGeometry, true, true );
    window.mat= {}
    mat['bball'] = view.material({
        name:'bball',
        roughness: 0.4,
        metalness: 0.7,
        map: { url:'bball.jpg', repeat:[2,1], flip:true },
        normalMap: { url:'bball_n.jpg', repeat:[2,1], flip:true },
    });
    
   
};
function afterLoadGeometry(){
    addPawn('p1', 0xff0000, [40,0,-48])
    addPawn('p2', 0x00ff00, [40,0,-47])
    addPawn('p3', 0x0000ff, [40,0,-46])
    addPawn('p4', 0xffff00, [40,0,-45])
} 
function Yoch_fordM( o ){
    if(option.currentCar!="fordM")return
    if(0==o.name.indexOf("recTangle") && ("undefined"==typeof oldColor || ("undefined"!=typeof oldColor && oldColor.recT.name != o.name))){
        if("undefined"!=typeof oldColor){oldColor.recT.material.color= oldColor.col; active_recTangle= null;}
        if("undefined"==typeof oldColor || ("undefined"!=typeof oldColor && oldColor.recT.name != o.name)){
            info.show(recTangle_info[parseInt(o.name.slice(9))])
        }
        oldColor= {recT:view.getScene().getObjectByName(o.name), col: view.getScene().getObjectByName(o.name).material.color}
        if(parseInt(o.name.slice(9)) == chaR(activeChar).posiTion && !chaR(activeChar).thRowing){
            active_recTangle= parseInt(o.name.slice(9));
            view.getScene().getObjectByName(o.name).material.color= {r:0.3,g:1,b:0.3}
        }else{
            view.getScene().getObjectByName(o.name).material.color= {r:0.5,g:0.5,b:0.5}
            active_recTangle= null;
        }
    }else if("undefined"!=typeof oldColor && oldColor.recT.name != o.name){
        oldColor.recT.material.color= oldColor.col;
        active_recTangle= null;
        delete oldColor
        info.clear()
    }
    if(0==o.name.indexOf("recTangle") && chaR(activeChar).thRowing){
        oldColor= "undefined"==typeof oldColor? {recT:view.getScene().getObjectByName(o.name), col: view.getScene().getObjectByName(o.name).material.color}: oldColor
        view.getScene().getObjectByName(o.name).material.color= {r:0.5,g:0.5,b:0.5}
        active_recTangle= null;
    }
} 
function Yoch_vaz( o ){
    if(option.currentCar!="vaz")return
    if(0==o.name.indexOf("recTangle") && ("undefined"==typeof oldColor || ("undefined"!=typeof oldColor && oldColor.recT.name != o.name))){
        if("undefined"!=typeof oldColor){oldColor.recT.material.color= oldColor.col; active_recTangle= null;}
        if("undefined"==typeof oldColor || ("undefined"!=typeof oldColor && oldColor.recT.name != o.name)){
            info.show(recTangle_info[parseInt(o.name.slice(9))])
        }
        oldColor= {recT:view.getScene().getObjectByName(o.name), col: view.getScene().getObjectByName(o.name).material.color}
        if(parseInt(o.name.slice(9)) == chaR(activeChar).posiTion && !chaR(activeChar).thRowing){
            active_recTangle= parseInt(o.name.slice(9));
            view.getScene().getObjectByName(o.name).material.color= {r:0.3,g:1,b:0.3}
        }else{
            view.getScene().getObjectByName(o.name).material.color= {r:0.5,g:0.5,b:0.5}
            active_recTangle= null;
        }
    }else if("undefined"!=typeof oldColor && oldColor.recT.name != o.name){
        oldColor.recT.material.color= oldColor.col;
        active_recTangle= null;
        delete oldColor
        info.clear()
    }
    if(0==o.name.indexOf("recTangle") && chaR(activeChar).thRowing){
        oldColor= "undefined"==typeof oldColor? {recT:view.getScene().getObjectByName(o.name), col: view.getScene().getObjectByName(o.name).material.color}: oldColor
        view.getScene().getObjectByName(o.name).material.color= {r:0.5,g:0.5,b:0.5}
        active_recTangle= null;
    }
}
function Yoch_coupe( o ){
    if(option.currentCar!="coupe")return
    if(0==o.name.indexOf("recTangle") && ("undefined"==typeof oldColor || ("undefined"!=typeof oldColor && oldColor.recT.name != o.name))){
        if("undefined"!=typeof oldColor){oldColor.recT.material.color= oldColor.col; active_recTangle= null;}
        if("undefined"==typeof oldColor || ("undefined"!=typeof oldColor && oldColor.recT.name != o.name)){
            info.show(recTangle_info[parseInt(o.name.slice(9))])
        }
        oldColor= {recT:view.getScene().getObjectByName(o.name), col: view.getScene().getObjectByName(o.name).material.color}
        if(parseInt(o.name.slice(9)) == chaR(activeChar).posiTion && !chaR(activeChar).thRowing){
            active_recTangle= parseInt(o.name.slice(9));
            view.getScene().getObjectByName(o.name).material.color= {r:0.3,g:1,b:0.3}
        }else{
            view.getScene().getObjectByName(o.name).material.color= {r:0.5,g:0.5,b:0.5}
            active_recTangle= null;
        }
    }else if("undefined"!=typeof oldColor && oldColor.recT.name != o.name){
        oldColor.recT.material.color= oldColor.col;
        active_recTangle= null;
        delete oldColor
        info.clear()
    }
    if(0==o.name.indexOf("recTangle") && chaR(activeChar).thRowing){
        oldColor= "undefined"==typeof oldColor? {recT:view.getScene().getObjectByName(o.name), col: view.getScene().getObjectByName(o.name).material.color}: oldColor
        view.getScene().getObjectByName(o.name).material.color= {r:0.5,g:0.5,b:0.5}
        active_recTangle= null;
    }
}
function Yoch_ben( o ){
    if(option.currentCar!="ben")return
    if(0==o.name.indexOf("recTangle") && ("undefined"==typeof oldColor || ("undefined"!=typeof oldColor && oldColor.recT.name != o.name))){
        if("undefined"!=typeof oldColor){oldColor.recT.material.color= oldColor.col; active_recTangle= null;}
        if("undefined"==typeof oldColor || ("undefined"!=typeof oldColor && oldColor.recT.name != o.name)){
            info.show(recTangle_info[parseInt(o.name.slice(9))])
        }
        oldColor= {recT:view.getScene().getObjectByName(o.name), col: view.getScene().getObjectByName(o.name).material.color}
        if(parseInt(o.name.slice(9)) == chaR(activeChar).posiTion && !chaR(activeChar).thRowing){
            active_recTangle= parseInt(o.name.slice(9));
            view.getScene().getObjectByName(o.name).material.color= {r:0.3,g:1,b:0.3}
        }else{
            view.getScene().getObjectByName(o.name).material.color= {r:0.5,g:0.5,b:0.5}
            active_recTangle= null;
        }
    }else if("undefined"!=typeof oldColor && oldColor.recT.name != o.name){
        oldColor.recT.material.color= oldColor.col;
        active_recTangle= null;
        delete oldColor
        info.clear()
    }
    if(0==o.name.indexOf("recTangle") && chaR(activeChar).thRowing){
        oldColor= "undefined"==typeof oldColor? {recT:view.getScene().getObjectByName(o.name), col: view.getScene().getObjectByName(o.name).material.color}: oldColor
        view.getScene().getObjectByName(o.name).material.color= {r:0.5,g:0.5,b:0.5}
        active_recTangle= null;
    }
}
function afterLoad () {


    physic.set({
        fps:60,
        substep:2,
        gravity:[0,-10,0],
        worldscale:1,
    })


    carMat = view.material({
        
        name:'extra',
        roughness: 0.2,
        metalness: 0.8,
        map:{ url:'cars.png'},
        transparent:true,
        side: 'Double',
        premultipliedAlpha: true,

    });

    // create cars
    var list = [];
    var g = [];
    for (var i = 0; i < CARS.length; i++){ 
        list.push( CARS[i].name );
        physic.add( vehicle( i, [47, 0,-49+(i*2.4)], 'convex') );
    }

    setTimeout(function(){for(var e= 0; e<=3;e++){
        chaR(e).name= prompt(`\u00bfQui\u00e9n conducir\u00e1 el ${CARS[e].name}\u003f`)
    };
    changeChar(0)
    dices.setThrower(activeChar)
    }, 3000)

    ui ({

        base:option,
        function: applyOption,

        follow: { type:'bool' },
        currentCar: { type:'list', list:list },
    
    });

    var fordM_raycaster = physic.add({ type:'ray',name:'fordM_raycaster', pos:[0,0,0], parent: view.getScene().getObjectByName("fordM"), start:[0,0.2,0], end:[0,-5,0], mask:1, precision:1, callback: Yoch_fordM, material: {opacity: 0} });
    var vaz_raycaster = physic.add({ type:'ray',name:'vaz_raycaster', pos:[0,0,0], parent: view.getScene().getObjectByName("vaz"), start:[0,0.2,0], end:[0,-5,0], mask:1, precision:1, callback: Yoch_vaz, material: {opacity: 0} });
    var coupe_raycaster = physic.add({ type:'ray',name:'coupe_raycaster', pos:[0,0,0], parent: view.getScene().getObjectByName("coupe"), start:[0,0.2,0], end:[0,-5,0], mask:1, precision:1, callback: Yoch_coupe, material: {opacity: 0} });
    var ben_raycaster = physic.add({ type:'ray',name:'ben_raycaster', pos:[0,0,0], parent: view.getScene().getObjectByName("ben"), start:[0,0.2,0], end:[0,-5,0], mask:1, precision:1, callback: Yoch_ben, material: {opacity: 0} });
    view.getScene().getObjectByName("fordM_raycaster").material.opacity= 0;
    view.getScene().getObjectByName("vaz_raycaster").material.opacity= 0;
    view.getScene().getObjectByName("coupe_raycaster").material.opacity= 0;
    view.getScene().getObjectByName("ben_raycaster").material.opacity= 0;
    view.getScene().getObjectByName("fordM_raycaster").material.transparent= true;
    view.getScene().getObjectByName("vaz_raycaster").material.transparent= true;
    view.getScene().getObjectByName("coupe_raycaster").material.transparent= true;
    view.getScene().getObjectByName("ben_raycaster").material.transparent= true;
    // ! \\ set the car we drive
    // use keyboard to controle car w
    physic.postUpdate= update
};
function update(){
    /*water.local.y += 0.25; 
    water.local.z += 0.25; 
    water.update( true );*/
}
function applyOption () {

    follow( option.follow ? option.currentCar : 'none' )
    physic.drive (option.currentCar);

}
window.activeChar= 0
window.active_recTangle= null
function changeChar (x) {
    follow( CARS[x].name )
    physic.drive (CARS[x].name);
    option.currentCar= CARS[x].name
    activeChar= x
    /*Object.values(char)[0].posiTion= 2*/
}


window.char= {
    c0: {posiTion: -1, adquisiTions:[], currencies: 1000, skip: 0, thRowing: false, caR: "fordM", hand: true},
    c1: {posiTion: -1, adquisiTions:[], currencies: 1000, skip: 0, thRowing: false, caR: "vaz", hand: true},
    c2: {posiTion: -1, adquisiTions:[], currencies: 1000, skip: 0, thRowing: false, caR: "coupe", hand: true},
    c3: {posiTion: -1, adquisiTions:[], currencies: 1000, skip: 0, thRowing: false, caR: "ben", hand: true}
}
window.chaR= function(N){
    return Object.values(char)[N]
}
display.log= function(t){
    document.querySelector("display log").innerHTML= `${t}`
}
burger.write= function(t){
    document.querySelector(".burger span").innerHTML= `${t}`
}

info.clear= function(){
    $("display img").attr("src", "")
    display.log('')
    burger.write('')
}
info.show= function(i){
    if("undefined"==typeof i){
        info.clear()
        return
    }
    $("display img").attr("src", i.pic)
    display.log(i.title)
    burger.write(i.description)
}


dices.throw= function(no_luck__experienced_method){if(no_luck__experienced_method || !!!no_luck__experienced_method){return [parseInt(Math.random() * 6) + 1, parseInt(Math.random() * 6) + 1]}}

dices.inform= function(th){
    Throw= th;
    chaR(activeChar).thRowing= false
    alert(`${th[0]} y ${th[1]} (${(th[0] + th[1])})`)    
}
dices.disable_throw= function(){
    $("#Throw").attr("disabled", "true")
    $("#Throw").text(`Tirar los dados`)
    $("#Throw").blur()
}
dices.setThrower= function(T){
    $("#Throw").removeAttr("disabled")
    activeChar= T;
    chaR(activeChar).thRowing= true
    if("undefined"!=typeof oldColor){
        oldColor.recT.material.color= oldColor.col;
        active_recTangle= null;
        delete oldColor
        info.clear()
    }
    $("#Throw").text(`Tirar los dados. (${chaR(T).name})`)
}