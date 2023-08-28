import Assets from './Game/utils/Assets.js';
import Game from './Game/Game.js';
import Loader from './Game/utils/Loader.js';
import '../index.css';

let GAME;

(async() => {
    try {
        const loader = new Loader();

        const result = await loader.LoadAll(Object.keys(Assets).map(k => Assets[k]));
        console.log(`Finished loading resources.`, result);

        Ammo = await Ammo()            
        console.log(`Finished loading Ammo JS.`);
                
        GAME = new Game();
    } catch (err) {
        console.log(err);
    }
})();