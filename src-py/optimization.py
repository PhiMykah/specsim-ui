import json
import sys
from random import randint
from typing import Any
import specsim
from specsim.main import main as execute

def setBounds(params : dict, key : str) -> None:
    if key in params:
        value = params.pop(key)
        if value != "":
            if isinstance(value, str):
                value: list[float] = [float(x) for x in value.split(",")]
            if isinstance(value, list) and len(value) == 2:
                params[key] = value
            else:
                raise ValueError("ampBounds must be a list with exactly two elements.")

def setVectorParam(params : dict, key : str, ndim : int) -> None:
    if key in params:
        value = params.pop(key)
        if value != "" and isinstance(value, str):
            value: list[float] = [float(x) for x in value.split(",")]
            if ndim > 0:
                if len(value) < ndim:
                    value = value + [value[0]] * (ndim - len(value))
                elif len(value) > ndim:
                    value = value[:ndim]
            params[key] = value

def emit_spectrum_update(step_result: dict):
    print(json.dumps(step_result))
    sys.stdout.flush()
    
if __name__ == "__main__":
    params : dict = json.loads(sys.stdin.read())
    ndim : int = int(params.get("ndim") or 2) if params.get("ndim") != "" else 2

    defaultScale = 1.0
    defaultXDecay : float = 2.0
    defaultYDecay : float = 0.0
    defaultOffset : float = 0.0
    defaultPhase : float = 0.0
    defaultAmpBounds : list[float] = [0.0, 10.0]
    defaultXDecayBounds : list[float] = [0.0, 20.0]
    defaultYDecayBounds : list[float] = [0.0, 15.0]
    defaultPhaseBounds : list[float] = [-180.0, 180.0]

    setVectorParam(params, "scale", ndim)
    setVectorParam(params, "freq", ndim)
    setVectorParam(params, 'off', ndim)
    setVectorParam(params, 'initXDecay', 0)
    setVectorParam(params, 'initYDecay', 0)
    setVectorParam(params, 'xP0', 0)
    setVectorParam(params, 'xP1', 0)
    setVectorParam(params, 'yP0', 0)
    setVectorParam(params, 'yP1', 0)
    setBounds(params, "ampBounds")
    setBounds(params, "xDecayBounds")
    setBounds(params, "yDecayBounds")
    setBounds(params, "p0Bounds")
    setBounds(params, "p1Bounds")

    params = {key: (None if value == "" else value) for key, value in params.items()}
    
    tab : str = params.get("tab", "test.tab")
    fid : str = params.get("fid", "test.fid")
    ft1 : str = params.get("ft1", "test.ft1")
    ft2 : str = params.get("ft2", "test.ft2")
    apod : str | None = params.get("apod")
    out : str | None = params.get("out")
    basis : str | None = params.get("basis")
    res : str | None = params.get("res")
    scale : list[float] | None = params.get("scale", [defaultScale] * ndim)
    rx1 : int = int(params.get("rx1") or 0)
    rxn : int = int(params.get("rxn") or 0)
    mode : str = params.get("mode", "lsq")
    trials : int = int(params.get("trials") or 100)
    maxFail : int = int(params.get("maxFail") or 0)
    iseed : int = params.get("iseed", randint(1, sys.maxsize))
    verb : bool = True if params.get("verb", "false") == "true" else False
    noverb : bool = True if params.get("noverb", "false") == "true" else False
    report : bool =  True if params.get("report", "false") == "true" else False
    freq : list[float] | None = params.get("freq")
    model : str = params.get("model", "exp")
    initXDecay : list[float] = params.get("initXDecay", [defaultXDecay])
    initYDecay : list[float] = params.get("initYDecay", [defaultYDecay])
    xDecayBounds : list[float] = params.get("xDecayBounds", defaultXDecayBounds)
    yDecayBounds : list[float] = params.get("yDecayBounds", defaultYDecayBounds)
    ampBounds : list[float] = params.get("ampBounds", defaultAmpBounds)
    p0Bounds : list[float] = params.get("p0Bounds", defaultPhaseBounds)
    p1Bounds : list[float] = params.get("p1Bounds", defaultPhaseBounds)
    step : float = float(params.get("step") or 0.1)
    offsets : list[float] = params.get("off", [defaultOffset] * ndim)
    j1 : float | None = float(params.get("j1") or 0.0) if params.get("j1") else None
    j2 : float | None = float(params.get("j2") or 0.0) if params.get("j2") else None
    j3 : float | None = float(params.get("j3") or 0.0) if params.get("j3") else None
    xP0 : list[float] = params.get("xP0", [defaultPhase])
    xP1 : list[float] = params.get("xP1", [defaultPhase])
    yP0 : list[float] = params.get("yP0", [defaultPhase])
    yP1 : list[float] = params.get("yP1", [defaultPhase])
    ts : bool = True if params.get("ts", "false") == "true" else False
    nots : bool = True if params.get("nots", "false") == "true" else False
    notdd : bool = True if params.get("notdd", "false") == "true" else False
    tdd : bool = True if params.get("tdd", "false") == "true" else False
    tdj : bool = True if params.get("tdj", "false") == "true" else False
    notdj : bool = True if params.get("notdj", "false") == "true" else False

    args = specsim.SpecSimArgs()
    args.set_values(
        tab, fid, ft1, ft2, apod, out, basis, ndim, res, 
        scale, rx1, rxn, mode, trials, maxFail, iseed, verb,
        noverb, report, freq, model, initXDecay, initYDecay, 
        xDecayBounds, yDecayBounds, ampBounds, p0Bounds, p1Bounds, 
        step, offsets, j1, j2, j3, xP0, xP1, yP0, yP1, 
        ts, nots, notdd, tdd, tdj, notdj
    )
    
    execute(args)