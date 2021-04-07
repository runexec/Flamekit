import "reflect-metadata";
import {container} from "tsyringe";

import * as Is from '../fragment/controller/is';
container.register('fragment.Is', Is.Injection);

import * as Store from '../fragment/store/store';
container.register('fragment.Store', Store.Injection);

import * as FragmentLiveListFiles from '../fragment/controller/file/fragmentLiveListFiles';
container.register('fragment.FragmentLiveListFiles', FragmentLiveListFiles.Injection);

import * as FragmentLiveArrayFiles from '../fragment/controller/file/fragmentLiveArrayFiles';
container.register('fragment.FragmentLiveArrayFiles', FragmentLiveArrayFiles.Injection);

import * as FragmentListFiles from '../fragment/controller/file/fragmentListFiles';
container.register('fragment.FragmentListFiles', FragmentListFiles.Injection);

import * as FragmentArrayFiles from '../fragment/controller/file/fragmentArrayFiles';
container.register('fragment.FragmentArrayFiles', FragmentArrayFiles.Injection);

import * as FragmentLiveListGroup from '../fragment/controller/group/fragmentLiveListGroup';
container.register('fragment.FragmentLiveListGroup', FragmentLiveListGroup.Injection);

import * as FragmentLiveArrayGroup from '../fragment/controller/group/fragmentLiveArrayGroup';
container.register('fragment.FragmentLiveArrayGroup', FragmentLiveArrayGroup.Injection);

import * as FragmentLiveGroup from '../fragment/controller/group/fragmentLiveGroup';
container.register('fragment.FragmentLiveGroup', FragmentLiveGroup.Injection);

import * as FragmentListGroup from '../fragment/controller/group/fragmentListGroup';
container.register('fragment.FragmentListGroup', FragmentListGroup.Injection);

import * as FragmentArrayGroup from '../fragment/controller/group/fragmentArrayGroup';
container.register('fragment.FragmentArrayGroup', FragmentArrayGroup.Injection);

import * as FragmentGroup from '../fragment/controller/group/fragmentGroup';
container.register('fragment.FragmentGroup', FragmentGroup.Injection);

import * as FragmentFileName from '../fragment/view/fragment/fileName';
container.register('fragment.FileName', FragmentFileName.Injection);

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

import * as CreateFragment from '../fragment/controller/create/createFragment';
container.register('fragment.CreateFragment', CreateFragment.Injection);

import * as CreateFragmentArray from '../fragment/controller/create/createFragmentArray';
container.register('fragment.CreateFragmentArray', CreateFragmentArray.Injection);

import * as CreateFragmentLiveArray from '../fragment/controller/create/createFragmentLiveArray';
container.register('fragment.CreateFragmentLiveArray', CreateFragmentLiveArray.Injection);

import * as CreateFragmentList from '../fragment/controller/create/createFragmentList';
container.register('fragment.CreateFragmentList', CreateFragmentList.Injection);

import * as CreateFragmentLive from '../fragment/controller/create/createFragmentLive';
container.register('fragment.CreateFragmentLive', CreateFragmentLive.Injection);

import * as CreateFragmentLiveList from '../fragment/controller/create/createFragmentLiveList';
container.register('fragment.CreateFragmentLiveList', CreateFragmentLiveList.Injection);

import * as LineTypeObject from '../fragment/controller/lineTypeObject';
container.register('fragment.LineTypeObject', LineTypeObject.Injection);

import * as CreateTextReplacement from '../fragment/controller/enitity/createTextReplacement';
container.register('fragment.CreateTextReplacement', CreateTextReplacement.Injection);

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

import * as FragmentI from '../fragment/injectable';
container.register('FragmentInstance', FragmentI.Fragment);