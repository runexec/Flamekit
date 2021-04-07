import "reflect-metadata";
import {container} from "tsyringe";


import * as CreateFragment from '../fragment/controller/create/createFragment';
container.register('fragment.createFragment', CreateFragment.Injection);

import * as CreateFragmentArray from '../fragment/controller/create/createFragmentArray';
container.register('fragment.createFragmentArray', CreateFragmentArray.Injection);

import * as CreateFragmentList from '../fragment/controller/create/createFragmentList';
container.register('fragment.createFragmentList', CreateFragmentList.Injection);

import * as CreateFragmentLive from '../fragment/controller/create/createFragmentLive';
container.register('fragment.createFragmentLive', CreateFragmentLive.Injection);

import * as CreateFragmentLiveArray from '../fragment/controller/create/createFragmentLiveArray';
container.register('fragment.createFragmentLiveArray', CreateFragmentLiveArray.Injection);

import * as CreateFragmentLiveList from '../fragment/controller/create/createFragmentLiveList';
container.register('fragment.createFragmentLiveList', CreateFragmentLiveList.Injection);

import * as FragmentLiveListTag from '../fragment/controller/tag/fragmentLiveListTag';
container.register('fragment.FragmentLiveListTag', FragmentLiveListTag.Injection);

import * as FragmentLiveArrayTag from '../fragment/controller/tag/fragmentArrayTag';
container.register('fragment.FragmentLiveArrayTag', FragmentLiveArrayTag.Injection);

import * as FragmentLiveTag from '../fragment/controller/tag/fragmentTag';
container.register('fragment.FragmentLiveTag', FragmentLiveTag.Injection);

import * as FragmentListTag from '../fragment/controller/tag/fragmentListTag';
container.register('fragment.FragmentListTag', FragmentListTag.Injection);

import * as FragmentArrayTag from '../fragment/controller/tag/fragmentArrayTag';
container.register('fragment.FragmentArrayTag', FragmentArrayTag.Injection);

import * as FragmentTag from '../fragment/controller/tag/fragmentTag';
container.register('fragment.FragmentTag', FragmentTag.Injection);

import * as FragmentLiveListMatch from '../fragment/controller/match/fragmentLiveListMatch';
container.register('fragment.FragmentLiveListMatch', FragmentLiveListMatch.Injection);

import * as FragmentLiveArrayMatch from '../fragment/controller/match/fragmentLiveArrayMatch';
container.register('fragment.FragmentArrayMatch', FragmentLiveArrayMatch.Injection);

import * as FragmentLiveMatch from '../fragment/controller/match/fragmentLiveMatch';
container.register('fragment.FragmentLiveMatch', FragmentLiveMatch.Injection);

import * as FragmentListMatch from '../fragment/controller/match/fragmentListMatch';
container.register('fragment.FragmentListMatch', FragmentListMatch.Injection);

import * as FragmentArrayMatch from '../fragment/controller/match/fragmentArrayMatch';
container.register('fragment.FragmentArrayMatch', FragmentArrayMatch.Injection);

import * as FragmentMatch from '../fragment/controller/match/fragmentMatch';
container.register('fragment.FragmentMatch', FragmentMatch.Injection);

import * as FragmentLiveListGroup from '../fragment/controller/group/fragmentLiveListGroup';
container.register('fragment.FragmentLiveListGroup', FragmentLiveListGroup.Injection);

import * as FragmentLiveArrayGroup from '../fragment/controller/group/fragmentLiveArrayGroup';
container.register('fragment.FragmentLiveArrayGroup', FragmentLiveArrayGroup.Injection);

import * as FragmentListGroup from '../fragment/controller/group/fragmentListGroup';
container.register('fragment.FragmentListGroup', FragmentListGroup.Injection);

import * as FragmentArrayGroup from '../fragment/controller/group/fragmentArrayGroup';
container.register('fragment.FragmentArrayGroup', FragmentArrayGroup.Injection);

import * as CreateTextReplacement from '../fragment/controller/enitity/createTextReplacement';
container.register('fragment.CreateTextReplacement', CreateTextReplacement.Injection);

import * as FragmentLiveListFiles from '../fragment/controller/file/fragmentLiveListFiles';
container.register('fragment.FragmentLiveListFiles', FragmentLiveListFiles.Injection);

import * as FragmentLiveArrayFiles from '../fragment/controller/file/fragmentLiveArrayFiles';
container.register('fragment.FragmentLiveArrayFiles', FragmentLiveArrayFiles.Injection);

import * as FragmentListFiles from '../fragment/controller/file/fragmentListFiles';
container.register('fragment.FragmentListFiles', FragmentListFiles.Injection);

import * as FragmentArrayFiles from '../fragment/controller/file/fragmentArrayFiles';
container.register('fragment.FragmentArrayFiles', FragmentArrayFiles.Injection);

import * as FragmentI from '../fragment/injectable';
import { Fragment } from "../fragment/view/fragment/template";
container.register('FragmentInstance', FragmentI.Fragment);