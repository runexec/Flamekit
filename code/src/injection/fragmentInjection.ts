import "reflect-metadata";
import { container } from "tsyringe";

const loadKey = ({ key, injection }: {
    key: string,
    injection: any
}) => {
    try { container.register(key, injection); } catch { }
};

import * as FileName from '../fragment/view/fragment/fileName';
loadKey({
    key: 'fragment.FileName',
    injection: FileName.Injection
});

import * as FragmentLiveListTemplate from '../fragment/view/fragment/fragmentLiveListTemplate';
loadKey({
    key: 'fragment.FragmentLiveListTemplate',
    injection: FragmentLiveListTemplate.Injection
});

import * as FragmentLiveArrayTemplate from '../fragment/view/fragment/fragmentLiveArrayTemplate';
loadKey({
    key: 'fragment.FragmentLiveArrayTemplate',
    injection: FragmentLiveArrayTemplate.Injection
});

import * as FragmentLiveTemplate from '../fragment/view/fragment/fragmentLiveTemplate';
loadKey({
    key: 'fragment.FragmentLiveTemplate',
    injection: FragmentLiveTemplate.Injection
});

import * as FragmentListTemplate from '../fragment/view/fragment/fragmentListTemplate';
loadKey({
    key: 'fragment.FragmentListTemplate',
    injection: FragmentListTemplate.Injection
});

import * as FragmentArrayTemplate from '../fragment/view/fragment/fragmentArrayTemplate';
loadKey({
    key: 'fragment.FragmentArrayTemplate',
    injection: FragmentArrayTemplate.Injection
});

import * as FragmentTemplate from '../fragment/view/fragment/fragmentTemplate';
loadKey({
    key: 'fragment.FragmentTemplate',
    injection: FragmentTemplate.Injection
});

import * as TemplateClass from '../fragment/view/fragment/templateClass';
loadKey({
    key: 'fragment.TemplateClass',
    injection: TemplateClass.Injection
});

import * as FragmentLiveArrayMatch from '../fragment/controller/match/fragmentLiveArrayMatch';
loadKey({
    key: 'fragment.FragmentLiveArrayMatch',
    injection: FragmentLiveArrayMatch.Injection
});

import * as FragmentLiveListMatch from '../fragment/controller/match/fragmentLiveListMatch';
loadKey({
    key: 'fragment.FragmentLiveListMatch',
    injection: FragmentLiveListMatch.Injection
});

import * as FragmentLiveMatch from '../fragment/controller/match/fragmentLiveMatch';
loadKey({
    key: 'fragment.FragmentLiveMatch',
    injection: FragmentLiveMatch.Injection
});

import * as FragmentListMatch from '../fragment/controller/match/fragmentListMatch';
loadKey({
    key: 'fragment.FragmentListMatch',
    injection: FragmentListMatch.Injection
});

import * as FragmentArrayMatch from '../fragment/controller/match/fragmentArrayMatch';
loadKey({
    key: 'fragment.FragmentArrayMatch',
    injection: FragmentArrayMatch.Injection
});

import * as FragmentMatch from '../fragment/controller/match/fragmentMatch';
loadKey({
    key: 'fragment.FragmentMatch',
    injection: FragmentMatch.Injection
});

import * as Is from '../fragment/controller/is';
loadKey({
    key: 'fragment.Is',
    injection: Is.Injection
});

import * as Store from '../fragment/store/store';
loadKey({
    key: 'fragment.Store',
    injection: Store.Injection
});

import * as Entity from '../fragment/controller/entity';
loadKey({
    key: 'fragment.Entity',
    injection: Entity.Injection
});

import * as FragmentLiveListGroup from '../fragment/controller/group/fragmentLiveListGroup';
loadKey({
    key: 'fragment.FragmentLiveListGroup',
    injection: FragmentLiveListGroup.Injection
});

import * as FragmentLiveArrayGroup from '../fragment/controller/group/fragmentLiveArrayGroup';
loadKey({
    key: 'fragment.FragmentLiveArrayGroup',
    injection: FragmentLiveArrayGroup.Injection
});

import * as FragmentLiveGroup from '../fragment/controller/group/fragmentLiveGroup';
loadKey({
    key: 'fragment.FragmentLiveGroup',
    injection: FragmentLiveGroup.Injection
});

import * as FragmentListGroup from '../fragment/controller/group/fragmentListGroup';
loadKey({
    key: 'fragment.FragmentListGroup',
    injection: FragmentListGroup.Injection
});

import * as FragmentArrayGroup from '../fragment/controller/group/fragmentArrayGroup';
loadKey({
    key: 'fragment.FragmentArrayGroup',
    injection: FragmentArrayGroup.Injection
});

import * as FragmentGroup from '../fragment/controller/group/fragmentGroup';
loadKey({
    key: 'fragment.FragmentGroup',
    injection: FragmentGroup.Injection
});

import * as FragmentLiveListFiles from '../fragment/controller/file/fragmentLiveListFiles';
loadKey({
    key: 'fragment.FragmentLiveListFiles',
    injection: FragmentLiveListFiles.Injection
});

import * as FragmentLiveArrayFiles from '../fragment/controller/file/fragmentLiveArrayFiles';
loadKey({
    key: 'fragment.FragmentLiveArrayFiles',
    injection: FragmentLiveArrayFiles.Injection
});

import * as FragmentListFiles from '../fragment/controller/file/fragmentListFiles';
loadKey({
    key: 'fragment.FragmentListFiles',
    injection: FragmentListFiles.Injection
});

import * as FragmentArrayFiles from '../fragment/controller/file/fragmentArrayFiles';
loadKey({
    key: 'fragment.FragmentArrayFiles',
    injection: FragmentArrayFiles.Injection
});


import * as FragmentLiveListTag from '../fragment/controller/tag/fragmentLiveListTag';
loadKey({
    key: 'fragment.FragmentLiveListTag',
    injection: FragmentLiveListTag.Injection
});

import * as FragmentLiveArrayTag from '../fragment/controller/tag/fragmentArrayTag';
loadKey({
    key: 'fragment.FragmentLiveArrayTag',
    injection: FragmentLiveArrayTag.Injection
});

import * as FragmentLiveTag from '../fragment/controller/tag/fragmentTag';
loadKey({
    key: 'fragment.FragmentLiveTag',
    injection: FragmentLiveTag.Injection
});

import * as FragmentListTag from '../fragment/controller/tag/fragmentListTag';
loadKey({
    key: 'fragment.FragmentListTag',
    injection: FragmentListTag.Injection
});

import * as FragmentArrayTag from '../fragment/controller/tag/fragmentArrayTag';
loadKey({
    key: 'fragment.FragmentArrayTag',
    injection: FragmentArrayTag.Injection
});

import * as FragmentTag from '../fragment/controller/tag/fragmentTag';
loadKey({
    key: 'fragment.FragmentTag',
    injection: FragmentTag.Injection
});

import * as CreateFragment from '../fragment/controller/create/createFragment';
loadKey({
    key: 'fragment.CreateFragment',
    injection: CreateFragment.Injection
});

import * as CreateFragmentArray from '../fragment/controller/create/createFragmentArray';
loadKey({
    key: 'fragment.CreateFragmentArray',
    injection: CreateFragmentArray.Injection
});

import * as CreateFragmentLiveArray from '../fragment/controller/create/createFragmentLiveArray';
loadKey({
    key: 'fragment.CreateFragmentLiveArray',
    injection: CreateFragmentLiveArray.Injection
});

import * as CreateFragmentList from '../fragment/controller/create/createFragmentList';
loadKey({
    key: 'fragment.CreateFragmentList',
    injection: CreateFragmentList.Injection
});

import * as CreateFragmentLive from '../fragment/controller/create/createFragmentLive';
loadKey({
    key: 'fragment.CreateFragmentLive',
    injection: CreateFragmentLive.Injection
});

import * as CreateFragmentLiveList from '../fragment/controller/create/createFragmentLiveList';
loadKey({
    key: 'fragment.CreateFragmentLiveList',
    injection: CreateFragmentLiveList.Injection
});

import * as LineTypeObject from '../fragment/controller/lineTypeObject';
loadKey({
    key: 'fragment.LineTypeObject',
    injection: LineTypeObject.Injection
});

import * as CreateTextReplacement from '../fragment/controller/enitity/createTextReplacement';
loadKey({
    key: 'fragment.CreateTextReplacement',
    injection: CreateTextReplacement.Injection
});

import * as FragmentI from '../fragment/injectable';
loadKey({
    key: 'FragmentInstance',
    injection: FragmentI.Fragment
});

import * as Fragment from '../fragment/fragment';
loadKey({
    key: 'Fragment',
    injection: Fragment.Injection
});