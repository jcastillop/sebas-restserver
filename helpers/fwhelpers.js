const edsFillVarsInSpeech = (originalStr, ... vars) => {

    var result = originalStr
    for (var i = 0; i < vars.length; ++i)
    {
        result = result.replace("[" + (i + 1) + "]", vars[i].toString())
    }

    return result;
}

module.exports = {
    edsFillVarsInSpeech,
}