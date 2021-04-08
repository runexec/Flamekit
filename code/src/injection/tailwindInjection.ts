import "reflect-metadata";
import {container} from "tsyringe";

import * as PostCSSConfigView from '../tailwindcss/view/postCSSConfigView';
container.register('tailwind.PostCSSConfigView', PostCSSConfigView.Injection);

import * as PostCSSLoaderView from '../tailwindcss/view/postCSSLoaderView';
container.register('tailwind.PostCSSLoaderView', PostCSSLoaderView.Injection);

import * as ImportView from '../tailwindcss/view/importView';
container.register('tailwind.ImportView', ImportView.Injection);

import * as ConfigView from '../tailwindcss/view/configView';
container.register('tailwind.ConfigView', ConfigView.Injection);

import * as TailwindCSSI from '../tailwindcss/injectable';
container.register('TailwindCSSInstance', TailwindCSSI.Injection);