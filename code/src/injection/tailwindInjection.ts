import "reflect-metadata";
import {container} from "tsyringe";
import * as TailwindCSSI from '../tailwindcss/injectable';
container.register('TailwindCSSInstance', TailwindCSSI.TailwindCSS);