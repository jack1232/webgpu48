import { CreateChartWithTexture } from './chart';
import { ParametricSurfaceData } from './surface-data';
import { Wellenkugel } from './math-func';
import $ from 'jquery';

const CreateChart = async (textureFile: string, colormapName:string, isAnimation = true) => {
    const data = ParametricSurfaceData(Wellenkugel, 0, 14.5, 0, 5, 70, 30, -10, 10, -10, 10, 1.5, 0, colormapName, [0,0,0]);
    await CreateChartWithTexture(data?.vertexData!, data?.normalData!, data?.uv1Data!, data?.colorData!, textureFile, isAnimation);
}

let textureFile = 'whitesquare.png';
let colormapName = 'jet';
let isAnimation = true;
CreateChart(textureFile, colormapName, isAnimation);

$('#id-radio input:radio').on('click', function(){
    let val = $('input[name="options"]:checked').val();
    if(val === 'animation') isAnimation = true;
    else isAnimation = false;
    CreateChart(textureFile, colormapName, isAnimation);
});

$('#id-texture').on('change',function(){
    const ele = this as any;
    textureFile = ele.options[ele.selectedIndex].value + '.png';
    CreateChart(textureFile, colormapName, isAnimation);
});

$('#id-colormap').on('change',function(){
    const ele = this as any;
    colormapName = ele.options[ele.selectedIndex].text;
    CreateChart(textureFile, colormapName, isAnimation);
});

window.addEventListener('resize', function(){
    CreateChart(textureFile, colormapName, isAnimation);
});
