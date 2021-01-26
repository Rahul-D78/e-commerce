const f = (name) => {
   let slugger = []
   let tc = String(name)

    for(let i =0; i< tc.length; i++) {
        if(i > 20) break

        let char = tc[i].toLowerCase()
        if(char >= 'a' && char <= 'z') {
            slugger.push(char)
        }else{
            slugger.push('-')
        }
    }
    return slugger.join('')
}

exports = module.exports = {f}