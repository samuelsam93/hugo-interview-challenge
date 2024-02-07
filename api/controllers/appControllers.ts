import db from '../db';

export async function createApplication(body:any) {
    const app = await db.application.create({
        data: body
    });

    return app;
}

export async function getApplication(appId: string) {
    const appData = await db.application.findUnique({
        where: {
            id: parseInt(appId)
        }
    });

    return appData
}

export async function updateApplication(body:any) {
    const appData = await db.application.upsert({
        where: { id: parseInt(body.id) },
        update: {
            firstName: body.firstName,
            lastName: body.lastName,
            dob: body.dob,
            streetAddress: body.streetAddress,
            city: body.city,
            state: body.state,
            zip: body.zip,
            vehicles: body.vehicles
        },
        create: {
            firstName: body.firstName,
            lastName: body.lastName,
            dob: body.dob,
            streetAddress: body.streetAddress,
            city: body.city,
            state: body.state,
            zip: body.zip,
            vehicles: body.vehicles
        }
    })
    return appData;
}

export async function submitApplication(body:any) {
    const app = await db.application.update({
        where: {id: parseInt(body.id)},
        data: {
            isSubmitted: true,
            price: (Math.round(Math.random()*10000))/100
        }
    });

    return app;
}