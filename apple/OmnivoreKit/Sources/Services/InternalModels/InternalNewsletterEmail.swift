import CoreData
import Foundation
import Models

struct InternalNewsletterEmail {
  let emailId: String
  let email: String
  let confirmationCode: String?

  func persist(context: NSManagedObjectContext) -> NSManagedObjectID? {
    var objectID: NSManagedObjectID?

    context.performAndWait {
      let newsletterEmail = asManagedObject(inContext: context)

      do {
        try context.save()
        logger.debug("NewsletterEmail saved succesfully")
        objectID = newsletterEmail.objectID
      } catch {
        context.rollback()
        logger.debug("Failed to save NewsletterEmail: \(error.localizedDescription)")
      }
    }

    return objectID
  }

  func asManagedObject(inContext context: NSManagedObjectContext) -> NewsletterEmail {
    let newsletterEmail = NewsletterEmail(entity: NewsletterEmail.entity(), insertInto: context)
    newsletterEmail.emailId = emailId
    newsletterEmail.email = email
    newsletterEmail.confirmationCode = confirmationCode
    return newsletterEmail
  }
}

extension Sequence where Element == InternalNewsletterEmail {
  func persist(context: NSManagedObjectContext) -> [NSManagedObjectID]? {
    var result: [NSManagedObjectID]?

    context.performAndWait {
      let newsletterEmails = map { $0.asManagedObject(inContext: context) }
      do {
        try context.save()
        logger.debug("NewsletterEmail saved succesfully")
        result = newsletterEmails.map(\.objectID)
      } catch {
        context.rollback()
        logger.debug("Failed to save NewsletterEmail: \(error.localizedDescription)")
      }
    }

    return result
  }
}
