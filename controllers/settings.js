const Brand = require("../store/brand");
const Model = require("../store/model");
const Variant = require("../store/variant");
const Color = require("../store/color");
const Code = require("../store/code");
const Price = require("../store/price");
const Phone = require("../store/phone");
const { SettingsContext } = require("twilio/lib/rest/voice/v1/dialingPermissions/settings");

module.exports.index = async (req, res, next) => {
  const name = "Settings";
  if (!req.session.user_id) {
    res.redirect("login");
  }else if (req.session.position === 'Employee') {
    res.send("Youre're not Authorized to access this page!")
  } else {
    const brands = await Brand.find({});
    const models = await Model.find({});
    const variants = await Variant.find({});
    const colors = await Color.find({});
    const prices = await Price.find({});
    res.render("settings", {
      name, brands, variants: JSON.stringify(variants),
      models: JSON.stringify(models), model: models, variantt: variants, duplicate: req.flash("duplicate-variant"),
      colors: JSON.stringify(colors),prices: JSON.stringify(prices), duplicateModel: req.flash("duplicate-model"), duplicateBrand: req.flash("duplicate-brand"),
      addedBrand: req.flash("added-brand"), addedModel: req.flash("added-model"), addedVariant: req.flash("added-variant"),
      addedColor: req.flash("added-color"), duplicateColor: req.flash("duplicate-color"), deleteBrand: req.flash("delete-brand"),
      deleteModel: req.flash("delete-model"), deleteVariant: req.flash("delete-variant"), deleteColor: req.flash("delete-color"),
      errorBrand: req.flash("error-brand"), errorModel: req.flash("error-model"), errorVariant: req.flash("error-variant"),
      errorColor: req.flash("error-color"), updatedBrand: req.flash("updated-brand"),updatedModel: req.flash("updated-model"),
      updatedVariant: req.flash("updated-variant"), updatedColor: req.flash("updated-color"), updatedPrice: req.flash("updated-price"),
      
    });
  }
 

}

module.exports.post = async (req, res) => {
  const { type,brand } = req.body;
  if (type === "brand") {
    const brandToFind = await Brand.findOne({brand:brand})
    if (!brandToFind) {
      const newBrand = new Brand({brand:brand});
      await newBrand.save();
      req.flash("added-brand", `${brand} has been added!`);
      res.redirect("setting");
    } else {
      req.flash("duplicate-brand", `${brand} already exists!`);
      res.redirect("setting");
    }
  } else if (type === "model") {
    const { brand, model, variant} = req.body;
    let { prices, color } = req.body;
    const colors = color.split(",")
    const price = prices.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const modelToFind = await Model.findOne({ brand: brand, model: model });
    let numArr = variant.match(/[\d\.]+/g)
    numArr = numArr.filter(n => n != '.')
    const newVar = `${numArr[0]}${numArr[1]}`  
    if (!modelToFind) {
      if (model.split(/\W+/).length >= 2) {
        const newmodel = model.split(/\W+/)
      let code = `${brand.substring(0, 3)}${newmodel[0].substring(0, 3)}${newmodel[1].substring(0, 3)}-${newVar}`
      if (newmodel.length == 3) {
        code = `${brand.substring(0, 3)}${newmodel[0].substring(0, 3)}${newmodel[1].substring(0, 3)}${newmodel[2].substring(0, 3)}-${newVar}`
        }
        if (newmodel.length == 4) {
          code = `${brand.substring(0, 3)}${newmodel[0].substring(0, 3)}${newmodel[1].substring(0, 3)}${newmodel[2].substring(0, 3)}${newmodel[3].substring(0, 3)}-${newVar}`
      }
      const newModel = new Model({ brand, model });
      const newVariant = new Variant({ brand, model, variant });
      const newColor = new Color({ brand, model, variant, colors });
      const newPrice = new Price({ brand, model, variant, price });
      const phone = new Device({ brand, model, variant, colors, price });
      await newModel.save();
      await newVariant.save();
      await newColor.save();
      await newPrice.save();
      await phone.save();
        colors.forEach(async color => {
        
        if (color.split(/\W+/).length === 3) {
          const newColor = color.split(/\W+/)
          const color1 = newColor[1].substring(0, 3)
          const color2 = newColor[2].substring(0, 3)
          const newColorCode = `${code}-${color1}${color2}`
          const newCode = new Code({ code: newColorCode.toUpperCase(), brand, model, variant, color, price });
          await newCode.save()
        } else if(color.split(/\W+/).length === 2) {
           const newColor = color.split(/\W+/)
          const color1 = newColor[0].substring(0, 3)
          const color2 = newColor[1].substring(0, 3)
          const newColorCode = `${code}-${color1}${color2}`
          const newCode = new Code({ code: newColorCode.toUpperCase(), brand, model, variant, color, price });
          await newCode.save()
        } else {
          const newColorCode = `${code}-${color.substring(0, 3)}`
          const newCode = new Code({ code: newColorCode.toUpperCase(), brand, model, variant, color, price });
          await newCode.save()
        }
      })
      req.flash("added-model", `${brand} ${model} has been added!`);
      res.redirect("setting")
      } else {
     
      const newModel = new Model({ brand, model });
      const newVariant = new Variant({ brand, model, variant });
      const newColor = new Color({ brand, model, variant, colors });
      const newPrice = new Price({ brand, model, variant, price });
      const phone = new Device({ brand, model, variant, colors, price });
      await newModel.save();
      await newVariant.save();
      await newColor.save();
      await newPrice.save();
      await phone.save();
      const code = `${brand.substring(0, 4)}${model.substring(0, 4)}-${newVar}`
      colors.forEach(async color => {
        if (color.split(/\W+/).length === 3) {
          const newColor = color.split(/\W+/)
          const color1 = newColor[1].substring(0, 3)
          const color2 = newColor[2].substring(0, 3)
          const newColorCode = `${code}-${color1}${color2}`
          const newCode = new Code({ code: newColorCode.toUpperCase(), brand, model, variant, color, price });
          await newCode.save()
        } else if (color.split(/\W+/).length === 2) {
          const newColor = color.split(/\W+/)
          const color1 = newColor[0].substring(0, 3)
          const color2 = newColor[1].substring(0, 3)
          const newColorCode = `${code}-${color1}${color2}`
          const newCode = new Code({ code: newColorCode.toUpperCase(), brand, model, variant, color, price });
          await newCode.save()
        } else {
          const newColorCode = `${code}-${color.substring(0, 3)}`
          const newCode = new Code({ code: newColorCode.toUpperCase(), brand, model, variant, color, price });
          await newCode.save()
        }
      })
      req.flash("added-model", `${brand} ${model} has been added!`);
      res.redirect("setting");
    }
    } else {
        req.flash("duplicate-model", `${brand} ${model} already exists!`);
        res.redirect("setting");
    }
  } else if (type === "variant") {
    const { brand, model, variant} = req.body;
    let { prices, color } = req.body;
    const colors = color.split(",")
    const price = prices.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const variantToFind = await Variant.findOne({ brand: brand, variant: variant, model: model });
    let numArr = variant.match(/[\d\.]+/g)
    numArr = numArr.filter(n => n != '.')
    const newVar = `${numArr[0]}${numArr[1]}`  
    if (!variantToFind) {
      if (model.split(/\W+/).length >= 2) {
     
      const newmodel = model.split(/\W+/)
      let code = `${brand.substring(0, 3)}${newmodel[0].substring(0, 3)}${newmodel[1].substring(0, 3)}-${newVar}`
      if (newmodel.length == 3) {
        code = `${brand.substring(0, 3)}${newmodel[0].substring(0, 3)}${newmodel[1].substring(0, 3)}${newmodel[2].substring(0, 3)}-${newVar}`
      } 
      if (newmodel.length == 4) {
          code = `${brand.substring(0, 3)}${newmodel[0].substring(0, 3)}${newmodel[1].substring(0, 3)}${newmodel[2].substring(0, 3)}${newmodel[3].substring(0, 3)}-${newVar}`
      }
      const newVariant = new Variant({ brand, model, variant });
      const newColor = new Color({ brand, model, variant, colors });
      const newPrice = new Price({ brand, model, variant, price });
      const phone = new Device({ brand, model, variant, colors, price });
      await newVariant.save();
      await newColor.save();
      await newPrice.save();
      await phone.save();
      colors.forEach(async color => {
        if (color.split(/\W+/).length === 3) {
          const newColor = color.split(/\W+/)
          const color1 = newColor[1].substring(0, 3)
          const color2 = newColor[2].substring(0, 3)
          const newColorCode = `${code}-${color1}${color2}`
          const newCode = new Code({ code: newColorCode.toUpperCase(), brand, model, variant, color, price });
          await newCode.save()
        }else if (color.split(/\W+/).length === 2) {
          const newColor = color.split(/\W+/)
          const color1 = newColor[0].substring(0, 3)
          const color2 = newColor[1].substring(0, 3)
          const newColorCode = `${code}-${color1}${color2}`
          const newCode = new Code({ code: newColorCode.toUpperCase(), brand, model, variant, color, price });
          await newCode.save()
        } else {
          const newColorCode = `${code}-${color.substring(0, 3)}`
          const newCode = new Code({ code: newColorCode.toUpperCase(), brand, model, variant, color, price });
          await newCode.save()
        }
      })
      req.flash("added-variant", `${brand} ${model} ${variant} has been added!`);
      res.redirect("setting");
      } else {
      const code = `${brand.substring(0, 3)}${model.substring(0, 3)}-${newVar}`
      const newVariant = new Variant({ brand, model, variant });
      const newColor = new Color({ brand, model, variant, colors });
      const newPrice = new Price({ brand, model, variant, price });
      const phone = new Device({ brand, model, variant, colors, price });
      await newVariant.save();
      await newColor.save();
      await newPrice.save();
      await phone.save();
      colors.forEach(async color => {
        if (color.split(/\W+/).length === 3) {
          const newColor = color.split(/\W+/)
          const color1 = newColor[1].substring(0, 3)
          const color2 = newColor[2].substring(0, 3)
          const newColorCode = `${code}-${color1}${color2}`
          const newCode = new Code({ code: newColorCode.toUpperCase(), brand, model, variant, color, price });
          await newCode.save()
        }else if (color.split(/\W+/).length === 2) {
          const newColor = color.split(/\W+/)
          const color1 = newColor[0].substring(0, 3)
          const color2 = newColor[1].substring(0, 3)
          const newColorCode = `${code}-${color1}${color2}`
          const newCode = new Code({ code: newColorCode.toUpperCase(), brand, model, variant, color, price });
          await newCode.save()
        }else {
          const newColorCode = `${code}-${color.substring(0, 3)}`
          const newCode = new Code({ code: newColorCode.toUpperCase(), brand, model, variant, color, price });
          await newCode.save()
        }
      })
      req.flash("added-variant", `${brand} ${model} ${variant} has been added!`);
      res.redirect("setting");
    }
    } else {
       req.flash("duplicate-variant", `${brand} ${model} with a variant of ${variant} already exists!`);
       res.redirect("setting");
    }
  }
  


}

module.exports.update = async (req, res) => {
  const { brand, model, variant, color, type,
    findBrand, updateModel, updateVariant, updateColor,oldPrice,price } = req.body;
  const colorToFind = await Color.findOne({ brand: brand, model: model, variant: variant, colors: color })
  if (type === 'brand') {
    const brandToUpdate = await Brand.updateMany({ brand: findBrand }, { brand: brand })
    const modelToUpdate = await Model.updateMany({ brand: findBrand }, { brand: brand })
    const variantToUpdate = await Variant.updateMany({ brand: findBrand }, { brand: brand })
    const colorToUpdate = await Color.updateMany({ brand: findBrand }, { brand: brand })
    const priceToUpdate = await Price.updateMany({ brand: findBrand }, { brand: brand })
    const phoneToupdate = await Phone.updateMany({ brand: findBrand }, { brand: brand })
    const deviceToUpdate = await Device.updateMany({ brand: findBrand }, { brand: brand })
    const codeToUpdate = await Code.updateMany({ brand: findBrand }, { brand: brand })
    const saleToUpdate = await Sale.updateMany({ brand: findBrand }, { brand: brand })
    req.flash("updated-brand", `${findBrand} has been updated to ${brand}!`);
    res.redirect("setting")
  } else if (type === 'model') {
    const modelToUpdate = await Model.updateMany({ brand: brand, model:model }, { model:updateModel })
    const variantToUpdate = await Variant.updateMany({ brand: brand, model:model }, { model:updateModel })
    const colorToUpdate = await Color.updateMany({ brand: brand, model:model }, {model:updateModel })
    const priceToUpdate = await Price.updateMany({ brand: brand, model:model }, { model:updateModel })
    const phoneToupdate = await Phone.updateMany({ brand: brand, model:model }, { model:updateModel })
    const deviceToUpdate = await Device.updateMany({ brand: brand, model: model }, { model: updateModel })
    const codeToUpdate = await Code.updateMany({ brand: brand, model: model }, { model: updateModel })
    const sale = await Sale.updateMany({ brand: brand, model: model }, { model: updateModel })
    req.flash("updated-model", `${brand} ${model} has been updated to ${brand} ${updateModel}!`);
    res.redirect("setting")
  } else if (type === 'variant') {
    const variantToUpdate = await Variant.updateMany({ brand: brand, model:model,variant:variant }, { variant:updateVariant })
    const colorToUpdate = await Color.updateMany({ brand: brand, model:model,variant:variant }, { variant:updateVariant })
    const priceToUpdate = await Price.updateMany({ brand: brand, model:model,variant:variant }, { variant:updateVariant })
    const phoneToupdate = await Phone.updateMany({ brand: brand, model:model,variant:variant }, { variant:updateVariant })
    const deviceToUpdate = await Device.updateMany({ brand: brand, model: model, variant: variant }, { variant: updateVariant })
    const codeToUpdate = await Code.updateMany({ brand: brand, model: model, variant: variant }, { variant: updateVariant })
    const sale = await Sale.updateMany({ brand: brand, model: model, variant: variant }, { variant: updateVariant })
    req.flash("updated-variant", `${brand} ${model} ${variant} has been updated to ${brand} ${model} ${updateVariant}!`);
    res.redirect("setting")
  } else if (type === 'color-update') {
    const colorToUpdate = await Color.updateMany({ brand: brand, model:model,variant:variant, colors:color }, { $set: { "colors.$" : updateColor } })
    const phoneToUpdate = await Phone.updateMany({ brand: brand, model: model, variant: variant, color: color }, { color: updateColor })
    const codeToUpdate = await Code.updateMany({ brand: brand, model: model, variant: variant, color: color }, { color: updateColor })
    const sale = await Sale.updateMany({ brand: brand, model:model,variant:variant, color:color }, { color: updateColor })
    const deviceToUpdate = await Device.updateMany({ brand: brand, model: model, variant: variant, colors: color }, { $set: { "colors.$": updateColor } })
    req.flash("updated-color", `${brand} ${model} ${variant} ${color} colorway has been updated to ${brand} ${model} ${variant} ${updateColor}!`);
    res.redirect("setting")
  } else if (type === 'price') {
    const variantToUpdate = await Variant.updateMany({ brand: brand, model:model,variant:variant, price: oldPrice}, { price:price })
    const priceToUpdate = await Price.updateMany({ brand: brand, model:model,variant:variant, price: oldPrice}, { price:price })
    const phoneToupdate = await Phone.updateMany({ brand: brand, model:model,variant:variant, price: oldPrice}, { price:price })
    const deviceToUpdate = await Device.updateMany({ brand: brand, model: model, variant: variant, price: oldPrice }, { price: price })
    const codeToUpdate = await Code.updateMany({ brand: brand, model:model,variant:variant, price: oldPrice}, { price:price })
    req.flash("updated-variant", `${brand} ${model} ${variant} has been updated to ${price}!`);
    res.redirect("setting")
 }else if (type === 'color') {
    if (!colorToFind) {
      const {price} = await  Device.findOne({ brand: brand, model: model, variant: variant })
      const colorToUpdate = await Color.findOne({ brand: brand, model: model, variant: variant })
      const deviceToUpdate = await Device.findOne({ brand: brand, model: model, variant: variant })
      colorToUpdate.colors.push(color)
      deviceToUpdate.colors.push(color)
      await colorToUpdate.save()
      await deviceToUpdate.save()
       let numArr = variant.match(/[\d\.]+/g)
    numArr = numArr.filter(n => n != '.')
    const newVar = `${numArr[0]}${numArr[1]}`  
      if (model.split(/\W+/).length >= 2) {
     
        const newmodel = model.split(/\W+/)
        let code = `${brand.substring(0, 3)}${newmodel[0].substring(0, 3)}${newmodel[1].substring(0, 3)}-${newVar}`
        if (newmodel.length == 3) {
          code = `${brand.substring(0, 3)}${newmodel[0].substring(0, 3)}${newmodel[1].substring(0, 3)}${newmodel[2].substring(0, 3)}-${newVar}`
        }
      
        if (color.split(/\W+/).length === 3) {
          const newColor = color.split(/\W+/)
          const color1 = newColor[1].substring(0, 3)
          const color2 = newColor[2].substring(0, 3)
          const newColorCode = `${code}-${color1}${color2}`
          const newCode = new Code({ code: newColorCode.toUpperCase(), brand, model, variant, color, price });
          await newCode.save()
        } else if (color.split(/\W+/).length === 2) {
          const newColor = color.split(/\W+/)
          const color1 = newColor[0].substring(0, 3)
          const color2 = newColor[1].substring(0, 3)
          const newColorCode = `${code}-${color1}${color2}`
          const newCode = new Code({ code: newColorCode.toUpperCase(), brand, model, variant, color, price });
          await newCode.save()
        } else {
          const newColorCode = `${code}-${color.substring(0, 3)}`
          const newCode = new Code({ code: newColorCode.toUpperCase(), brand, model, variant, color, price });
          await newCode.save()
        }
      } else {
        const code = `${brand.substring(0, )}${model.substring(0, 3)}-${newVar}`
          if (color.split(/\W+/).length === 3) {
            const newColor = color.split(/\W+/)
            const color1 = newColor[1].substring(0, 3)
            const color2 = newColor[2].substring(0, 3)
            const newColorCode = `${code}-${color1}${color2}`
            const newCode = new Code({ code: newColorCode.toUpperCase(), brand, model, variant, color, price });
            await newCode.save()
          } else if (color.split(/\W+/).length === 2) {
            const newColor = color.split(/\W+/)
            const color1 = newColor[0].substring(0, 3)
            const color2 = newColor[1].substring(0, 3)
            const newColorCode = `${code}-${color1}${color2}`
            const newCode = new Code({ code: newColorCode.toUpperCase(), brand, model, variant, color, price });
            await newCode.save()
          } else {
            const newColorCode = `${code}-${color.substring(0, 3)}`
            const newCode = new Code({ code: newColorCode.toUpperCase(), brand, model, variant, color, price });
            await newCode.save()
          }
        
      
      }
      req.flash("added-color", ` ${color} colorway has been added to ${brand} ${model} ${variant}!`);
      res.redirect("setting");
    } else {
      req.flash("duplicate-color", `${model} ${variant} already has a colorway of ${color}!`);
      res.redirect("setting");
    
    }
  }
}

module.exports.delete = async (req, res) => {
  const { type,brand,model,variant,color } = req.body;
  if (type === "brand") {
    const brandTofind = await Brand.findOne({ brand: brand })
    if (brandTofind) {
      const findBrand = await Brand.find({ brand: brand });
      const findModel = await Model.find({ brand: brand });
      const findvariant = await Variant.find({ brand: brand });
      const findColor = await Color.find({ brand: brand });
      const findPrice = await Price.find({ brand: brand });
      const findDevice = await Device.find({ brand: brand });
     const findCode = await Code.find({ brand: brand });
      findBrand.forEach(async find => {
        const newBrand = new DeletedBrand({brand: find.brand})
        await newBrand.save()
      })
       findModel.forEach(async find => {
        const newData = new DeletedModel({brand: find.brand, model: find.model})
        await newData.save()
       })
       findvariant.forEach(async find => {
        const newData = new DeletedVariant({brand: find.brand, model: find.model, variant:find.variant})
        await newData.save()
       })
      findColor.forEach(async find => {
          const newData = new DeletedColor({ brand: find.brand, model: find.model, variant: find.variant, colors: find.colors })
          await newData.save()
        })
   
       findPrice.forEach(async find => {
        const newData = new DeletedPrice({brand: find.brand, model: find.model, variant:find.variant, price:find.price})
        await newData.save()
       })
      findCode.forEach(async find => {
        const newData = new DeletedCode({code:find.code, brand: find.brand, model: find.model, variant:find.variant,color:find.color, price:find.price})
        await newData.save()
       })
      findDevice.forEach(async find => {
          const newData = new DeletedDevice({
            brand: find.brand, model: find.model,
            variant: find.variant, colors: find.colors, price: find.price
          })
          await newData.save()
       })
      const brandTodelete = await Brand.deleteOne({ brand: brand });
      const modelTodelete = await Model.deleteMany({ brand: brand });
      const variantToDelete = await Variant.deleteMany({ brand: brand });
      const colorToDelete = await Color.deleteMany({ brand: brand });
      const priceToDelete = await Price.deleteMany({ brand: brand });
      const deviceTodelete = await Device.deleteMany({ brand: brand });
      const codeToDelete = await Code.deleteMany({ brand: brand });
      req.flash("delete-brand", `${brand} has been deleted!`);
      res.redirect("setting");
    } else {
      req.flash("error-brand", `${brand} doesn't exist!`);
      res.redirect("setting");
    }
  } else if (type === "model") {
    const modelToFind = await Model.findOne({brand: brand, model: model })
    if (modelToFind) {
      const deviceToFind = await Device.find({brand: brand, model: model })
      const findModel = await Model.findOne({ brand: brand, model: model })
      
      deviceToFind.forEach(async device =>  {
        const newDevice = new DeletedDevice({
          brand: device.brand, model: device.model, variant: device.variant,
          price: device.price, colors: device.colors
        });
        await newDevice.save()
      })
      const codeToFind = await Code.find({brand: brand, model: model })
      codeToFind.forEach(async code =>  {
        const newCode = new DeletedCode({
          brand: code.brand, model: code.model, variant: code.variant,
          price: code.price, color: code.color,code: code.code
        });
        await newCode.save()
      })
      const findvariant = await Variant.find({ brand: brand, model: model })
      const findColor = await Color.find({ brand: brand, model: model })
      const findPrice = await Price.find({ brand: brand, model: model })
     
        const newData = new DeletedModel({brand: findModel.brand, model: findModel.model})
        await newData.save()
      
       findvariant.forEach(async find => {
        const newData = new DeletedVariant({brand: find.brand, model: find.model, variant:find.variant})
        await newData.save()
       })
      findColor.forEach(async find => {
          const newData = new DeletedColor({ brand: find.brand, model: find.model, variant: find.variant, colors: find.colors })
          await newData.save()
        })
   
       findPrice.forEach(async find => {
        const newData = new DeletedPrice({brand: find.brand, model: find.model, variant:find.variant, price:find.price})
        await newData.save()
       })

      const newModel = new DeletedModel({brand:findModel.brand, model:findModel.model });
      await newModel.save()
      const modelTodelete = await Model.deleteOne({ brand: brand, model: model });
      const deviceTodelete = await Device.deleteMany({ brand: brand, model: model });
      const variantTodelete = await Variant.deleteMany({ brand: brand, model: model });
      const colorTodelete = await Color.deleteMany({ brand: brand, model: model });
      const priceTodelete = await Price.deleteMany({ brand: brand, model: model });
      const code = await Code.deleteMany({ brand: brand, model: model });
      req.flash("delete-model", `${brand} ${model} has been deleted!`);
      res.redirect("setting");
    } else {
      req.flash("error-model", `${brand} ${model} doesn't exist!`);
      res.redirect("setting");
    }
  } else if (type === "variant") {
    const variantToFind = await Variant.findOne({ brand: brand, model: model, variant: variant })
    const findColor = await Color.find({ brand: brand, model: model })
    const findPrice = await Price.find({ brand: brand, model: model })

    if (variantToFind) {
      const findVariant = await Variant.findOne({ brand: brand, model: model, variant: variant });
      const findDevice = await Device.findOne({ brand: brand, model: model, variant: variant });
      const findCode = await Code.findOne({ brand: brand, model: model, variant: variant });
      const newData = new DeletedVariant({ brand: findVariant.brand, model: findVariant.model, variant: findVariant.variant })
      await newData.save()
      const newDevice = new DeletedDevice({
          brand: findDevice.brand, model: findDevice.model, variant: findDevice.variant,
          price: findDevice.price, colors: findDevice.colors
      });
       const newCode = new DeletedCode({
          brand: findCode.brand, model: findCode.model, variant: findCode.variant,
          price: findCode.price, colors: findCode.color,code: findCode.code
       });
      const newPrice = new DeletedPrice({
          brand: findCode.brand, model: findCode.model, variant: findCode.variant,
          price: findCode.price, 
      });
      const newColors = new DeletedDevice({
          brand: findDevice.brand, model: findDevice.model, variant: findDevice.variant,
          price: findDevice.price, colors: findDevice.colors
      });
      await newDevice.save()
      await newCode.save()
      const variantTodelete = await Variant.deleteOne({ brand: brand, model: model, variant: variant });
      const deviceTodelete = await Device.deleteOne({ brand: brand, model: model, variant: variant });
      const codeToDelete = await Code.deleteOne({ brand: brand, model: model, variant: variant });
       const colorTodelete = await Color.deleteMany({ brand: brand, model: model, variant: variant });
      const priceTodelete = await Price.deleteMany({ brand: brand, model: model, variant: variant });
      req.flash("delete-variant", `${variant} has been deleted!`);
      res.redirect("setting");
    } else {
      req.flash("error-variant", `${model} ${variant} doesn't exist!`);
      res.redirect("setting");
    }
  } else if (type === "color") {
    const colorToFind = await Color.findOne({ brand: brand, model: model, variant: variant, colors: color })
    const codeToFind = await Code.findOne({ brand: brand, model: model, variant: variant,color:color })
    if (colorToFind) {
      const newColor = new DeletedColor({brand: brand, model: model, variant: variant,color: color });
      await newColor.save()
      const newCode = new DeletedColor({code:codeToFind.code,brand: brand, model: model, variant: variant,color: color });
      await newCode.save()
      const colorToDelete = await Color.updateOne({ brand: brand, model: model, variant: variant }, { $pull: { colors: color } });
      const deviceTodelete = await Device.updateOne({ brand: brand, model: model, variant: variant }, { $pull: { colors: color } });
      const codeToDelete = await Code.deleteOne({ brand: brand, model: model, variant: variant, color:color });
       req.flash("delete-color", `${color} has been deleted from ${model} ${variant}!`);
      res.redirect("setting");
    } else {
       req.flash("error-color", `${model} ${variant} doesn't have a colorway of ${color}!`);
      res.redirect("setting");
    }
  }
}