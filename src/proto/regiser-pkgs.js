﻿// @flow

const { MsgDecoder } = require("../msg/msg-decoder");
const PKG_CatchFish_Item = require("./pkg/catchfish/item");
const PKG_CatchFish_MoveItem = require("./pkg/catchfish/move-item");
const PKG_CatchFish_Events_Event = require("./pkg/catchfish/events/event");
const PKG_CatchFish_Fish = require("./pkg/catchfish/fish");
const PKG_CatchFish_Configs_Item = require("./pkg/catchfish/configs/item");
const PKG_CatchFish_Stages_StageElement = require("./pkg/catchfish/stages/stage-element");
const PKG_CatchFish_Weapon = require("./pkg/catchfish/weapon");
const PKG_CatchFish_ColorFish = require("./pkg/catchfish/color-fish");
const PKG_CatchFish_Configs_Fish = require("./pkg/catchfish/configs/fish");
const PKG_CatchFish_Bullet = require("./pkg/catchfish/bullet");
const PKG_CatchFish_Configs_Cannon = require("./pkg/catchfish/configs/cannon");
const PKG_CatchFish_Cannon = require("./pkg/catchfish/cannon");
const PKG_CatchFish_Stages_Emitter_RandomFishs = require("./pkg/catchfish/stages/emitter-random-fishs");
const PKG_CatchFish_Stages_Monitor_KeepBigFish = require("./pkg/catchfish/stages/monitor-keep-big-fish");
const PKG_CatchFish_Events_NoMoney = require("./pkg/catchfish/events/no-money");
const PKG_CatchFish_Events_Refund = require("./pkg/catchfish/events/refund");
const PKG_CatchFish_Events_FishDead = require("./pkg/catchfish/events/fish-dead");
const PKG_CatchFish_Events_PushWeapon = require("./pkg/catchfish/events/push-weapon");
const PKG_CatchFish_Events_Fire = require("./pkg/catchfish/events/fire");
const PKG_CatchFish_Events_CloseAutoFire = require("./pkg/catchfish/events/close-auto-fire");
const PKG_CatchFish_Events_CannonSwitch = require("./pkg/catchfish/events/cannon-switch");
const PKG_CatchFish_Events_CloseAutoLock = require("./pkg/catchfish/events/close-auto-lock");
const PKG_CatchFish_Events_Aim = require("./pkg/catchfish/events/aim");
const PKG_CatchFish_Events_OpenAutoLock = require("./pkg/catchfish/events/open-auto-lock");
const PKG_CatchFish_Events_PushFish = require("./pkg/catchfish/events/push-fish");
const PKG_CatchFish_Events_OpenAutoFire = require("./pkg/catchfish/events/open-auto-fire");
const PKG_Generic_Success = require("./pkg/generic/success");
const PKG_CatchFish_Events_DebugInfo = require("./pkg/catchfish/events/debug-info");
const PKG_CatchFish_Stages_Stage = require("./pkg/catchfish/stages/stage");
const PKG_CatchFish_Stages_Monitor_KeepFatFish = require("./pkg/catchfish/stages/monitor-keep-fat-fish");
const PKG_CatchFish_Stages_Monitor_KeepBombFish = require("./pkg/catchfish/stages/monitor-keep-bomb-fish");
const PKG_CatchFish_Stages_Emitter_RingFishs = require("./pkg/catchfish/stages/emitter-ring-fishs");
const PKG_CatchFish_Stages_Emitter_CircleFishs = require("./pkg/catchfish/stages/emitter-circle-fishs");
const PKG_CatchFish_Configs_Config = require("./pkg/catchfish/configs/config");
const PKG_CatchFish_Configs_SpriteFrame = require("./pkg/catchfish/configs/sprite-frame");
const PKG_CatchFish_Configs_Physics = require("./pkg/catchfish/configs/physics");
const PKG_CatchFish_Configs_FishSpriteFrame = require("./pkg/catchfish/configs/fish-sprite-frame");
const PKG_CatchFish_Configs_BigFish = require("./pkg/catchfish/configs/big-fish");
const PKG_CatchFish_Configs_ColorFish = require("./pkg/catchfish/configs/color-fish");
const PKG_CatchFish_Configs_Weapon = require("./pkg/catchfish/configs/weapon");
const PKG_CatchFish_Events_CannonCoinChange = require("./pkg/catchfish/events/cannon-coin-change");
const PKG_CatchFish_Events_Leave = require("./pkg/catchfish/events/leave");
const PKG_CatchFish_FuryBullet = require("./pkg/catchfish/fury-bullet");
const PKG_CatchFish_DrillBullet = require("./pkg/catchfish/drill-bullet");
const PKG_Generic_Error = require("./pkg/generic/error");
const PKG_Generic_Ping = require("./pkg/generic/ping");
const PKG_Generic_Pong = require("./pkg/generic/pong");
const PKG_CatchFish_Client_EnterSuccess = require("./pkg/catchfish_client/enter-success");
const PKG_CatchFish_Client_FrameEvents = require("./pkg/catchfish_client/frame-events");
const PKG_Client_CatchFish_Enter = require("./pkg/client_catchfish/enter");
const PKG_Client_CatchFish_Bet = require("./pkg/client_catchfish/bet");
const PKG_Client_CatchFish_Fire = require("./pkg/client_catchfish/fire");
const PKG_Client_CatchFish_Hit = require("./pkg/client_catchfish/hit");
const PKG_CatchFish_Scene = require("./pkg/catchfish/scene");
const PKG_CatchFish_Player = require("./pkg/catchfish/player");
const PKG_CatchFish_FishBorn = require("./pkg/catchfish/fish-born");
const PKG_CatchFish_Way = require("./pkg/catchfish/way");
const PKG_CatchFish_Configs_FuryCannon = require("./pkg/catchfish/configs/fury-cannon");
const PKG_CatchFish_DrillCannon = require("./pkg/catchfish/drill-cannon");
const PKG_CatchFish_FuryCannon = require("./pkg/catchfish/fury-cannon");
const PKG_CatchFish_LightWeapon = require("./pkg/catchfish/light-weapon");
const PKG_CatchFish_DrillWeapon = require("./pkg/catchfish/drill-weapon");
const PKG_CatchFish_FuryWeapon = require("./pkg/catchfish/fury-weapon");
const PKG_CatchFish_Events_Enter = require("./pkg/catchfish/events/enter");
const PKG_CatchFish_BombWeapon = require("./pkg/catchfish/bomb-weapon");
const PKG_CatchFish_DrillFish = require("./pkg/catchfish/drill-fish");
const PKG_CatchFish_FuryFish = require("./pkg/catchfish/fury-fish");
const PKG_CatchFish_BombFish = require("./pkg/catchfish/bomb-fish");
const PKG_CatchFish_BigFish = require("./pkg/catchfish/big-fish");
const PKG_CatchFish_RoundFish = require("./pkg/catchfish/round-fish");
const PKG_CatchFish_WayFish = require("./pkg/catchfish/way-fish");
const PKG_CatchFish_LightFish = require("./pkg/catchfish/light-fish");
const PKG_CatchFish_Configs_DrillCannon = require("./pkg/catchfish/configs/drill-cannon");

module.exports = function (md: MsgDecoder) {
    md.register(PKG_CatchFish_Item);
    md.register(PKG_CatchFish_MoveItem);
    md.register(PKG_CatchFish_Events_Event);
    md.register(PKG_CatchFish_Fish);
    md.register(PKG_CatchFish_Configs_Item);
    md.register(PKG_CatchFish_Stages_StageElement);
    md.register(PKG_CatchFish_Weapon);
    md.register(PKG_CatchFish_ColorFish);
    md.register(PKG_CatchFish_Configs_Fish);
    md.register(PKG_CatchFish_Bullet);
    md.register(PKG_CatchFish_Configs_Cannon);
    md.register(PKG_CatchFish_Cannon);
    md.register(PKG_CatchFish_Stages_Emitter_RandomFishs);
    md.register(PKG_CatchFish_Stages_Monitor_KeepBigFish);
    md.register(PKG_CatchFish_Events_NoMoney);
    md.register(PKG_CatchFish_Events_Refund);
    md.register(PKG_CatchFish_Events_FishDead);
    md.register(PKG_CatchFish_Events_PushWeapon);
    md.register(PKG_CatchFish_Events_Fire);
    md.register(PKG_CatchFish_Events_CloseAutoFire);
    md.register(PKG_CatchFish_Events_CannonSwitch);
    md.register(PKG_CatchFish_Events_CloseAutoLock);
    md.register(PKG_CatchFish_Events_Aim);
    md.register(PKG_CatchFish_Events_OpenAutoLock);
    md.register(PKG_CatchFish_Events_PushFish);
    md.register(PKG_CatchFish_Events_OpenAutoFire);
    md.register(PKG_Generic_Success);
    md.register(PKG_CatchFish_Events_DebugInfo);
    md.register(PKG_CatchFish_Stages_Stage);
    md.register(PKG_CatchFish_Stages_Monitor_KeepFatFish);
    md.register(PKG_CatchFish_Stages_Monitor_KeepBombFish);
    md.register(PKG_CatchFish_Stages_Emitter_RingFishs);
    md.register(PKG_CatchFish_Stages_Emitter_CircleFishs);
    md.register(PKG_CatchFish_Configs_Config);
    md.register(PKG_CatchFish_Configs_SpriteFrame);
    md.register(PKG_CatchFish_Configs_Physics);
    md.register(PKG_CatchFish_Configs_FishSpriteFrame);
    md.register(PKG_CatchFish_Configs_BigFish);
    md.register(PKG_CatchFish_Configs_ColorFish);
    md.register(PKG_CatchFish_Configs_Weapon);
    md.register(PKG_CatchFish_Events_CannonCoinChange);
    md.register(PKG_CatchFish_Events_Leave);
    md.register(PKG_CatchFish_FuryBullet);
    md.register(PKG_CatchFish_DrillBullet);
    md.register(PKG_Generic_Error);
    md.register(PKG_Generic_Ping);
    md.register(PKG_Generic_Pong);
    md.register(PKG_CatchFish_Client_EnterSuccess);
    md.register(PKG_CatchFish_Client_FrameEvents);
    md.register(PKG_Client_CatchFish_Enter);
    md.register(PKG_Client_CatchFish_Bet);
    md.register(PKG_Client_CatchFish_Fire);
    md.register(PKG_Client_CatchFish_Hit);
    md.register(PKG_CatchFish_Scene);
    md.register(PKG_CatchFish_Player);
    md.register(PKG_CatchFish_FishBorn);
    md.register(PKG_CatchFish_Way);
    md.register(PKG_CatchFish_Configs_FuryCannon);
    md.register(PKG_CatchFish_DrillCannon);
    md.register(PKG_CatchFish_FuryCannon);
    md.register(PKG_CatchFish_LightWeapon);
    md.register(PKG_CatchFish_DrillWeapon);
    md.register(PKG_CatchFish_FuryWeapon);
    md.register(PKG_CatchFish_Events_Enter);
    md.register(PKG_CatchFish_BombWeapon);
    md.register(PKG_CatchFish_DrillFish);
    md.register(PKG_CatchFish_FuryFish);
    md.register(PKG_CatchFish_BombFish);
    md.register(PKG_CatchFish_BigFish);
    md.register(PKG_CatchFish_RoundFish);
    md.register(PKG_CatchFish_WayFish);
    md.register(PKG_CatchFish_LightFish);
    md.register(PKG_CatchFish_Configs_DrillCannon);
};
